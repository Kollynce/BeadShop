import { app } from '@/config/firebase';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  updateDoc, 
  doc, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';

// Initialize Firestore with the existing Firebase app
const db = getFirestore(app);

/**
 * Service to manage notifications using Firestore
 */
export const NotificationService = {
  /**
   * Create a new notification in Firestore
   * @param {Object} notification - Notification object
   * @param {string} notification.userId - User ID
   * @param {string} notification.title - Notification title
   * @param {string} notification.message - Notification message
   * @param {string} notification.type - Notification type (info, success, warning, error)
   */
  async createNotification(notification) {
    try {
      const notificationData = {
        ...notification,
        type: notification.type || 'info',
        read: false,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'notifications'), notificationData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  /**
   * Get notifications for a specific user
   * @param {string} userId - User ID
   * @param {number} maxResults - Maximum number of results to return
   */
  async getUserNotifications(userId, maxResults = 20) {
    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
    } catch (error) {
      console.error('Error getting user notifications:', error);
      throw error;
    }
  },

  /**
   * Subscribe to notifications for a specific user
   * @param {string} userId - User ID
   * @param {function} callback - Callback function
   * @param {number} maxResults - Maximum number of results to return
   */
  subscribeToUserNotifications(userId, callback, maxResults = 20) {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );

    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      callback(notifications);
    }, error => {
      console.error('Error in notification subscription:', error);
      callback([], error);
    });
  },

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   */
  async markAsRead(notificationId) {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  /**
   * Mark notification as unread
   * @param {string} notificationId - Notification ID
   */
  async markAsUnread(notificationId) {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, { read: false });
    } catch (error) {
      console.error('Error marking notification as unread:', error);
      throw error;
    }
  }
};
