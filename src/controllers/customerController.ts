import { Request, Response } from 'express';
import Stripe from 'stripe';
import { createCustomer, createpaymentIntent } from '../services/customerService';

export const createCustomerConstroller = async (req: Request, res: Response) => {
  try {
    const params = req.body.params;
    const customer  = await createCustomer(params);

    res.status(201).send(customer); 

  } catch (error) {
    console.error(error);
    res.status(500).send(error);

  }
};

export const getClientSecretConstroller = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    
    const intent = await createpaymentIntent(params);

    res.status(200).send({client_secret: (intent as Stripe.PaymentIntent).client_secret});
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}



