import Payment from "../db/models/Payment";

export const getPayments = async () => {
    try {
        const payments = await Payment.findAll();
        return payments;
    } catch (error) {
        console.log(error);
        return null;
    }
};
//TODO: crear el payment tanto en base de datos, como en stripe
export const createPayment = async(data:any) => {
    try {
        console.log(data);
        const newPayment = await Payment.create({
            data: data
        })

        return newPayment;

    } catch (error) {
        console.log(error);
        return null;
    }
}
