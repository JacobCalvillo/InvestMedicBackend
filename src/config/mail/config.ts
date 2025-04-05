import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new OAuth2Client(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

async function getAccessToken() {
    const { token } = await oauth2Client.getAccessToken();
    return token;
}

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'jakeob99@gmail.com',
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: getAccessToken(),
    },
} as nodemailer.TransportOptions);