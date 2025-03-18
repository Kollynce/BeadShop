import { defineStore } from 'pinia';
import { ref } from 'vue';
import { 
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDocs,
  doc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '@/config/firebase';

export const useNotificationStore = defineStore('notification', () => {
  // In-app temporary notifications
  const notifications = ref([]);
  // User-specific persisted notifications from Firestore
  const userNotifications = ref([]);
  let nextId = 0;
  let unsubscribe = null;
  
  // Track if index is missing
  const indexMissing = ref(false);
  const indexCreationUrl = ref(null);

  // Add a temporary in-app notification
  const addNotification = (notification) => {
    const id = nextId++;
    notifications.value.push({
      id,
      type: 'info',
      timeout: 5000,
      ...notification,
      timestamp: new Date()
    });
    
    // Auto remove after timeout
    if (notification.timeout) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.timeout);
    }
    
    return id;
  };

  // Remove a notification
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  // Add a notification to Firestore for persistence
  const addPersistedNotification = async (notification, userId = null) => {
    try {
      // If index is missing, we can't query but we can still write
      const currentUser = auth.currentUser;
      
      // If no userId is provided, use the current user's ID
      if (!userId && currentUser) {
        userId = currentUser.uid;
      }
      
      if (!userId) {
        console.error('No user ID provided for notification');
        return null;
      }
      
      const notificationData = {
        ...notification,
        userId,
        type: notification.type || 'info',
        read: false,
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, 'notifications'), notificationData);
      
      // Also show as in-app notification
      addNotification(notification);
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding notification:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to save notification',
        type: 'error'
      });
      return null;
    }
  };

  // Extract index creation URL from error
  const extractIndexUrl = (error) => {
    const matches = error.message.match(/https:\/\/console\.firebase\.google\.com[^"'\s]+/);
    return matches ? matches[0] : null;
  };

  // Load user notifications from Firestore
  const loadUserNotifications = (maxResults = 20) => {
    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        console.log('No authenticated user to load notifications for');
        userNotifications.value = [];
        return;
      }
      
      // Unsubscribe from previous listener if any
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      
      // If we know the index is missing, don't try to query again
      if (indexMissing.value) {
        console.log('Skipping notification query because required index is missing');
        return;
      }
      
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc'),
        limit(maxResults)
      );
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        userNotifications.value = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // Handle Firestore Timestamp objects
            createdAt: data.createdAt instanceof Timestamp ? 
              data.createdAt.toDate() : 
              data.createdAt ? new Date(data.createdAt) : new Date()
          };
        });
        
        // Reset index missing status if query succeeds
        if (indexMissing.value) {
          indexMissing.value = false;
          indexCreationUrl.value = null;
          console.log('Index is now available, notifications loaded successfully');
        }
        console.log('Loaded notifications:', userNotifications.value);
      }, (error) => {
        console.error('Error loading notifications:', error);
        
        // Check if this is a missing index error
        if (error.message.includes('The query requires an index')) {
          indexMissing.value = true;
          indexCreationUrl.value = extractIndexUrl(error);
          
          console.log('Missing Firestore index. Please create the index at:', indexCreationUrl.value);
          
          // Show a notification about the missing index to the admin
          if (auth.currentUser?.isAdmin) {
            addNotification({
              title: 'Database Setup Required',
              message: 'The notification system needs a database index to be created. Please check the console for instructions.',
              type: 'warning',
              timeout: 10000
            });
          }
        } else {
          addNotification({
            title: 'Error',
            message: 'Failed to load notifications',
            type: 'error'
          });
        }
      });
    } catch (error) {
      console.error('Error setting up notifications listener:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      console.log('Marking notification as read:', notificationId);
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
      
      // Update local copy
      const index = userNotifications.value.findIndex(n => n.id === notificationId);
      if (index !== -1) {
        userNotifications.value[index].read = true;
      }
      
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to update notification',
        type: 'error'
      });
      return false;
    }
  };

  // Create a helper function to open the index creation URL
  const openIndexCreationUrl = () => {
    if (indexCreationUrl.value) {
      window.open(indexCreationUrl.value, '_blank');
      return true;
    }
    return false;
  };

  // Clean up when store is no longer needed
  const cleanup = () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  };

  return {
    notifications,
    userNotifications,
    addNotification,
    removeNotification,
    addPersistedNotification,
    loadUserNotifications,
    markAsRead,
    cleanup,
    indexMissing,
    indexCreationUrl,
    openIndexCreationUrl
  };
});


