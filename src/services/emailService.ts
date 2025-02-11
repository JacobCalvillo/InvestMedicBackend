import { transporter } from "../mail/config";
import { welcomeEmailmessage } from "../mail/emailTemplates/messages";

interface mailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export const sendWelcomeEmail = async(email: string) => {
    try {
        const mailOptions: mailOptions = {
            from: "jakeob99@gmail.com",
            to: email,
            subject: "Bienvenido a nuestra plataforma",
            html: welcomeEmailmessage
        }
        

        const emailResponse = await transporter.sendMail(mailOptions);

        return emailResponse.response;
        
    } catch (error) {
        return error;
    }
}