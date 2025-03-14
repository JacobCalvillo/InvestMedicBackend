import { Request, Response } from 'express';
import Stripe from 'stripe';
import {
  createCustomer,
  createPaymentIntent,
  createPayment
} from '../services/customer.service';

export const createCustomerController = async (req: Request, res: Response) => {
  try {
    const params = req.body.params;
    const customer  = await createCustomer(params);

    res.status(201).send(customer); 

  } catch (error) {
    console.error(error);
    res.status(500).send(error);

  }
};

export const getClientSecretController = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    
    const intent = await createPaymentIntent(params);

    res.status(200).send({client_secret: (intent as Stripe.PaymentIntent).client_secret});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    const payment = await createPayment(params);
    if (payment) {
      res.status(201).send(payment);
    } else {
      res.status(400).send(payment)
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

