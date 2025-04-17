import { createSESClient } from "../../config/aws/SES";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";

dotenv.config();

export const sendWelcomeEmail = async (email: string, user: string) => {
    if (!email || !user) {
        console.error("Invalid email or user");
        return { success: false, message: "Invalid email or user" };
    }

    const sesClient = await createSESClient();
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
        const command = new SendEmailCommand(params);
        const data = await sesClient.send(command);
        console.log('Email enviado correctamente', data);
        return { success: true, messageId: data.MessageId };
    } catch (error) {
        console.log(error);
        return { success: false, message: error };
    }
};