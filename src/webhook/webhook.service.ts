import { updateStatusAppointment } from "../core/services/appointment.service";
import Stripe from "stripe";

export const handleStripeEvent = async(event: Stripe.Event) => {
    try {
        if(event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const appointmentId = session.metadata?.appointment_id;

            if(appointmentId){
                await updateStatusAppointment(Number(appointmentId), 2);
                return `Cita ${appointmentId} pagada`;
            }
            return `Cita no encontrada`;
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}