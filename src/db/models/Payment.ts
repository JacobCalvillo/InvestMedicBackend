export interface Payment {
    id?: number;
    stripePaymentId: string;
    amount: number;
    currency: string;
    payment_method_id: number;
    patient_id: number;
}