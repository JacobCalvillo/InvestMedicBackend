"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = exports.getServiceById = exports.getServices = exports.stripeSession = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const successUrl = process.env.NODE_ENV === 'development'
    ? 'https://app-front-medic-3kyzdoube-jacobcalvillos-projects.vercel.app/success'
    : `${process.env.FRONTEND_URL}/success`;
const stripeSession = (serviceId, customerEmail, quantity, appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield connect_db_1.default.query(`SELECT * FROM Service WHERE id = $1`, [serviceId]);
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card', 'oxxo'],
            line_items: [
                {
                    price: service.rows[0].stripe_price_id,
                    quantity: quantity || 1,
                },
            ],
            mode: 'payment',
            customer_email: customerEmail,
            success_url: successUrl,
            metadata: {
                appointment_id: appointmentId,
            }
        });
        if (!session) {
            return null;
        }
        return session;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.stripeSession = stripeSession;
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield connect_db_1.default.query(`SELECT * FROM Service`);
        return services.rows || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.getServices = getServices;
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield connect_db_1.default.query(`SELECT * FROM Service WHERE id = $1`, [id]);
        if (!service) {
            return null;
        }
        return service.rows[0];
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.getServiceById = getServiceById;
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect_db_1.default.query('BEGIN');
        const newService = yield connect_db_1.default.query(`INSERT INTO Service (name, description, price) 
            VALUES ($1, $2, $3) RETURNING *`, [service.name, service.description, service.price]);
        const stripeProduct = yield stripe.products.create({
            name: service.name,
            description: service.description,
            metadata: {
                productId: newService.rows[0].id,
            }
        });
        const price = yield stripe.prices.create({
            unit_amount: newService.rows[0].price * 100,
            currency: 'mxn',
            product: stripeProduct.id
        });
        const serviceWithStripe = yield connect_db_1.default.query(`UPDATE Service
             SET stripe_price_id = $1, stripe_product_id = $2
             WHERE id = $3
             RETURNING *`, [price.id, stripeProduct.id, newService.rows[0].id]);
        if (!newService || !stripeProduct || !price) {
            yield connect_db_1.default.query('ROLLBACK');
            return null;
        }
        yield connect_db_1.default.query('COMMIT');
        return serviceWithStripe.rows[0];
    }
    catch (error) {
        yield connect_db_1.default.query('ROLLBACK');
        console.error(error);
        return null;
    }
});
exports.createService = createService;
