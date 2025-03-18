import { httpsCallable } from 'firebase/functions';
import { functions } from '@/firebase/config';

// Cloud function wrapper for sending emails
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const sendMailFunction = httpsCallable(functions, 'sendEmail');
    const result = await sendMailFunction({
      to,
      subject,
      text,
      html
    });
    return result.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Utility functions for common email templates
export const sendWelcomeEmail = async (user) => {
  return sendEmail({
    to: user.email,
    subject: 'Welcome to Our Jewelry Shop!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Jewelry Shop, ${user.displayName || 'Valued Customer'}!</h2>
        <p>Thank you for creating an account with us. We're excited to have you join our community.</p>
        <p>Explore our beautiful collection of handcrafted jewelry and find something that speaks to you.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Jewelry Team</p>
      </div>
    `
  });
};

export const sendOrderConfirmation = async (user, order) => {
  return sendEmail({
    to: user.email,
    subject: `Order Confirmation #${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank You for Your Order!</h2>
        <p>Dear ${user.displayName || 'Valued Customer'},</p>
        <p>Your order #${order.id} has been received and is being processed.</p>
        <h3>Order Details:</h3>
        <ul>
          ${order.items.map(item => `<li>${item.quantity}x ${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
        <p>We'll notify you when your order has shipped.</p>
        <p>Best regards,<br>The Jewelry Team</p>
      </div>
    `
  });
};
