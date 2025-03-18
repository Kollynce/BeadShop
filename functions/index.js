const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Create a transporter using your email service credentials
// For example, using Gmail:
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass
  }
});

// Cloud function to send emails
exports.sendEmail = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated', 
      'The function must be called while authenticated.'
    );
  }

  const { to, subject, text, html } = data;

  if (!to || !subject || (!text && !html)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email data is incomplete'
    );
  }

  // Setup email options
  const mailOptions = {
    from: `"Jewelry Shop" <${functions.config().email.user}>`,
    to,
    subject,
    text,
    html
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Error sending email');
  }
});

// Optional: Function to send notification on new order
exports.sendOrderNotification = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snapshot, context) => {
    const order = snapshot.data();
    const userId = order.userId;
    
    try {
      // Get user data
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      const user = userDoc.data();
      
      // Add notification to Firestore
      await admin.firestore().collection('notifications').add({
        userId,
        title: 'Order Confirmation',
        message: `Your order #${context.params.orderId} has been received`,
        type: 'success',
        read: false,
        orderId: context.params.orderId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Send email notification
      const mailOptions = {
        from: `"Jewelry Shop" <${functions.config().email.user}>`,
        to: user.email,
        subject: `Order Confirmation #${context.params.orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank You for Your Order!</h2>
            <p>Dear ${user.displayName || 'Valued Customer'},</p>
            <p>Your order #${context.params.orderId} has been received and is being processed.</p>
            <h3>Order Details:</h3>
            <ul>
              ${order.items.map(item => `<li>${item.quantity}x ${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
            <p>We'll notify you when your order has shipped.</p>
            <p>Best regards,<br>The Jewelry Team</p>
          </div>
        `
      };
      
      await transporter.sendMail(mailOptions);
      
      return { success: true };
    } catch (error) {
      console.error('Error processing order notification:', error);
      return { success: false, error: error.message };
    }
  });
