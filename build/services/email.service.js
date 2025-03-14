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
exports.sendWelcomeEmail = void 0;
const SES_1 = require("../aws/SES");
const client_ses_1 = require("@aws-sdk/client-ses");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendWelcomeEmail = (email, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !user) {
        console.error("Invalid email or user");
        return { success: false, message: "Invalid email or user" };
    }
    const sesClient = yield (0, SES_1.createSESClient)();
    const params = {
        Source: process.env.SES_SENDER_EMAIL,
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Subject: {
                Data: "Welcome to the clinic!",
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Data: `
                        <html>
                          <body>
                            <h1>¡Hola ${user}!</h1>
                            <p>Gracias por registrarte en nuestra plataforma.</p>
                            <p>Estamos emocionados de tenerte con nosotros.</p>
                            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                            <br>
                            <p>Saludos,</p>
                            <p>El equipo de InvestMedic</p>
                          </body>
                        </html>
                      `,
                    Charset: 'UTF-8'
                },
                Text: {
                    Data: `¡Hola!\nGracias por registrarte en nuestra plataforma.\nEstamos emocionados de tenerte con nosotros.\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEl equipo de InvestMedic`,
                    Charset: 'UTF-8'
                }
            }
        }
    };
    try {
        console.log('ToAddresses:', params.Destination.ToAddresses);
        const command = new client_ses_1.SendEmailCommand(params);
        const data = yield sesClient.send(command);
        console.log('Email enviado correctamente', data);
        return { success: true, messageId: data.MessageId };
    }
    catch (error) {
        console.log(error);
        return { success: false, message: error };
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
