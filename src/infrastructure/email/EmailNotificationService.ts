import { NotificationService } from '../../core/domain/interfaces/services/NotificationService';
import { Appointment } from '../../core/domain/entities/Appointment';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { createSESClient } from '../../config/aws/SES';
import dotenv from 'dotenv';

dotenv.config();

export class EmailNotificationService implements NotificationService {
    private async sendEmail(to: string, subject: string, htmlBody: string, textBody: string): Promise<boolean> {
        try {
            const sesClient = await createSESClient();
            const params = {
                Source: process.env.SES_SENDER_EMAIL,
                Destination: {
                    ToAddresses: [to]
                },
                Message: {
                    Subject: {
                        Data: subject,
                        Charset: 'UTF-8'
                    },
                    Body: {
                        Html: {
                            Data: htmlBody,
                            Charset: 'UTF-8'
                        },
                        Text: {
                            Data: textBody,
                            Charset: 'UTF-8'
                        }
                    }
                }
            };

            const command = new SendEmailCommand(params);
            await sesClient.send(command);
            return true;
        } catch (error) {
            console.error('Failed to send email:', error);
            return false;
        }
    }

    // You'll need to fetch patient and doctor emails in a real implementation
    // This is simplified for demonstration
    async sendAppointmentConfirmation(appointment: Appointment): Promise<boolean> {
        // In a real implementation, you'd query the database to get the patient's email
        const patientEmail = 'patient@example.com'; // Replace with actual patient email lookup

        const subject = 'Your appointment has been confirmed';
        const htmlBody = `
      <html>
        <body>
          <h1>Appointment Confirmation</h1>
          <p>Your appointment on ${new Date(appointment.startTime).toLocaleString()} has been confirmed.</p>
          <p>Reason: ${appointment.reason || 'Not specified'}</p>
          <p>Thank you for choosing our services.</p>
        </body>
      </html>
    `;
        const textBody = `
      Appointment Confirmation
      
      Your appointment on ${new Date(appointment.startTime).toLocaleString()} has been confirmed.
      Reason: ${appointment.reason || 'Not specified'}
      
      Thank you for choosing our services.
    `;

        return this.sendEmail(patientEmail, subject, htmlBody, textBody);
    }

    async sendAppointmentCancellation(appointment: Appointment): Promise<boolean> {
        const patientEmail = 'patient@example.com'; // Replace with actual patient email lookup

        const subject = 'Your appointment has been cancelled';
        const htmlBody = `
      <html>
        <body>
          <h1>Appointment Cancellation</h1>
          <p>Your appointment on ${new Date(appointment.startTime).toLocaleString()} has been cancelled.</p>
          <p>If you didn't request this cancellation, please contact us.</p>
        </body>
      </html>
    `;
        const textBody = `
      Appointment Cancellation
      
      Your appointment on ${new Date(appointment.startTime).toLocaleString()} has been cancelled.
      If you didn't request this cancellation, please contact us.
    `;

        return this.sendEmail(patientEmail, subject, htmlBody, textBody);
    }

    async sendAppointmentReminder(appointment: Appointment): Promise<boolean> {
        const patientEmail = 'patient@example.com'; // Replace with actual patient email lookup

        const subject = 'Reminder: Upcoming Appointment';
        const htmlBody = `
      <html>
        <body>
          <h1>Appointment Reminder</h1>
          <p>This is a reminder about your upcoming appointment on ${new Date(appointment.startTime).toLocaleString()}.</p>
          <p>Reason: ${appointment.reason || 'Not specified'}</p>
          <p>We look forward to seeing you!</p>
        </body>
      </html>
    `;
        const textBody = `
      Appointment Reminder
      
      This is a reminder about your upcoming appointment on ${new Date(appointment.startTime).toLocaleString()}.
      Reason: ${appointment.reason || 'Not specified'}
      
      We look forward to seeing you!
    `;

        return this.sendEmail(patientEmail, subject, htmlBody, textBody);
    }
}