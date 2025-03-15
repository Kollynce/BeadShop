import { firebaseService } from '../services/firebaseService'
import { getAuth } from 'firebase/auth'

export const adminSetup = {
  // List of admin email addresses
  adminEmails: [
    'your-admin-email@example.com'  // Replace with your admin email
  ],

  // Initialize admin status for current user
  async initializeAdminStatus() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.log('No user logged in');
      return false;
    }

    try {
      const isAdmin = this.adminEmails.includes(user.email);
      await firebaseService.setUserAdminStatus(user.uid, isAdmin);
      console.log(`Admin status set for ${user.email}:`, isAdmin);
      return isAdmin;
    } catch (error) {
      console.error('Error setting admin status:', error);
      return false;
    }
  }
}
