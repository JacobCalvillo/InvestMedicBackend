import Payment from "../models/Payment"
import PaymentMethod from "../models/PaymentMethod"

PaymentMethod.hasOne(Payment, {
    foreignKey: {
        name: "payment_method_id"
    }
})