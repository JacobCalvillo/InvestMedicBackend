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
exports.getAllMedicalPractitioners = void 0;
const connect_db_1 = __importDefault(require("../db/db-config/connect.db"));
const getAllMedicalPractitioners = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
            SELECT 
                mp.*, 
                u.username, 
                u.email, 
                u.phone, 
                u.profile_picture_url
            FROM 
                Medical_Practitioner mp
            INNER JOIN 
                "User" u 
            ON  
                mp.user_id = u.id
        `;
        const result = yield connect_db_1.default.query(query);
        // Mapeamos y devolvemos los datos para incluir los datos del usuario relacionado
        return result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            lastName: row.last_name,
            birthDate: row.birth_date,
            userId: row.user_id,
            user: {
                username: row.username,
                email: row.email,
                phone: row.phone,
                profile_picture_url: row.profile_picture_url
            }
        })) || null;
    }
    catch (error) {
        console.error('Error fetching medical practitioners:', error);
        return null;
    }
});
exports.getAllMedicalPractitioners = getAllMedicalPractitioners;
