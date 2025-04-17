
import { Request, Response } from 'express';
import { sendWelcomeEmail } from '../../core/services/email.service';

export const sendWelcomeEmailController = async (req: Request, res: Response) => {
    try {
        const response = await sendWelcomeEmail(req.body.email, req.body.username);
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(400).send(response);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}