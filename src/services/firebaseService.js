import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { mockDataLoader } from '../utils/mockDataLoader'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export const firebaseService = {
  // User profile operations
  async createUserProfile(userId, userData) {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date()
    })
  },

  async getUserProfile(userId) {
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)
    return userSnap.exists() ? userSnap.data() : null
  },

  async updateUserProfile(userId, userData) {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, userData, { merge: true })
  },

  // Product operations
  async getProducts() {
    try {
      const productsRef = collection(db, 'products')
      const productsSnap = await getDocs(productsRef)

      if (productsSnap.empty) {
        throw new Error('No products found')
      }

      return productsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.log('Firebase: falling back to mock data for all products')
      // Instead of throwing error, return mock products
      return mockDataLoader.getProducts()
    }
  },

  async getFeaturedProducts(limit = 4) {
    try {
      const productsRef = collection(db, 'products')
      const q = query(
        productsRef,
        where('featured', '==', true),
        orderBy('createdAt', 'desc')
      )
      const productsSnap = await getDocs(q)

      if (productsSnap.empty) {
        return mockDataLoader.getFeaturedProducts(limit)
      }

      return productsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).slice(0, limit)
    } catch (error) {
      console.log('Firebase: falling back to mock data for featured products')
      return mockDataLoader.getFeaturedProducts(limit)
    }
  },

  async getProduct(productId) {
    try {
      const productRef = doc(db, 'products', productId)
      const productSnap = await getDoc(productRef)

      if (!productSnap.exists()) {
        throw new Error(`Product with ID: ${productId} not found`)
      }

      return {
        id: productSnap.id,
        ...productSnap.data()
      }
    } catch (error) {
      console.log(`Firebase: falling back to mock data for product ${productId}`)
      return mockDataLoader.getProductById(productId)
    }
  },

  // New product management methods
  async createProduct(productData) {
    try {
      const timestamp = serverTimestamp()
      
      // Clone product data to avoid modifying the original
      const processedProduct = {...productData};
      
      // If the base64 images are too large, it might exceed Firestore document size limits
      // You may need to split large base64 strings into separate documents if needed
      
      const completeProductData = {
        ...processedProduct,
        createdAt: timestamp,
        updatedAt: timestamp
      }

      const productsRef = collection(db, 'products')
      const docRef = await addDoc(productsRef, completeProductData)

      return {
        id: docRef.id,
        ...completeProductData
      }
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async updateProduct(productId, productData) {
    try {
      const productRef = doc(db, 'products', productId)

      const updatedData = {
        ...productData,
        updatedAt: serverTimestamp()
      }

      await updateDoc(productRef, updatedData)

      return {
        id: productId,
        ...updatedData
      }
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error)
      throw error
    }
  },

  async deleteProduct(productId) {
    try {
      // First get the product to check if it has images to delete from storage
      const productRef = doc(db, 'products', productId)
      const productSnap = await getDoc(productRef)

      if (!productSnap.exists()) {
        throw new Error(`Product with ID: ${productId} not found`)
      }

      const productData = productSnap.data()

      // Delete product document from Firestore
      await deleteDoc(productRef)

      // If the product had images stored in Firebase Storage, delete them too
      // This is optional and depends on how you manage images
      if (productData.images && Array.isArray(productData.images)) {
        // Filter only images that are stored in Firebase Storage (starts with 'gs://' or contains firebasestorage.googleapis.com)
        const firebaseImages = productData.images.filter(imgUrl => 
          imgUrl.startsWith('gs://') || 
          imgUrl.includes('firebasestorage.googleapis.com')
        )

        for (const imgUrl of firebaseImages) {
          try {
            // Extract the path from the URL if it's a full URL
            let imagePath = imgUrl
            if (imgUrl.includes('firebasestorage.googleapis.com')) {
              const url = new URL(imgUrl)
              const pathMatch = url.pathname.match(/\/o\/(.+)\?/)
              if (pathMatch && pathMatch[1]) {
                imagePath = decodeURIComponent(pathMatch[1])
              } else {
                console.warn(`Could not extract path from URL: ${imgUrl}`)
                continue
              }
            }

            const imageRef = ref(storage, imagePath)
            await deleteObject(imageRef)
          } catch (imgError) {
            console.warn(`Failed to delete image ${imgUrl}:`, imgError)
            // Continue deleting other images even if one fails
          }
        }
      }

      return true
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error)
      throw error
    }
  },

  // Alternative image handling without Firebase Storage
  async uploadProductImage(file) {
    try {
      // Create a unique identifier
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      
      // Resize the image before converting to base64
      const resizedImageBlob = await this.resizeImage(file, {
        maxWidth: 800,  // Maximum width for product images
        maxHeight: 800, // Maximum height for product images
        quality: 0.85   // Good quality but smaller file size
      });
      
      // Check final size after resizing
      if (resizedImageBlob.size > 500 * 1024) {
        // If still too large, try with lower quality
        const furtherResizedBlob = await this.resizeImage(file, {
          maxWidth: 600,
          maxHeight: 600, 
          quality: 0.7
        });
        
        if (furtherResizedBlob.size > 500 * 1024) {
          throw new Error(`Image still too large after resizing. Please use a smaller image or reduce its quality.`);
        }
        
        // Use the further resized version
        return this.blobToBase64(furtherResizedBlob);
      }
      
      // Use the resized version
      return this.blobToBase64(resizedImageBlob);
    } catch (error) {
      console.error("Error processing image:", error);
      throw new Error(`Failed to process image: ${error.message || 'Unknown error'}`);
    }
  },
  
  // Helper to convert Blob to base64
  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result;
        // Return with a prefix to identify this as a base64 image
        resolve(`base64://${base64String}`);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read the image file'));
      };
      
      reader.readAsDataURL(blob);
    });
  },
  
  // Helper function to resize images
  resizeImage(file, options = {}) {
    const { maxWidth = 800, maxHeight = 800, quality = 0.85 } = options;
    
    return new Promise((resolve, reject) => {
      // Create a FileReader to read the file
      const reader = new FileReader();
      
      // Set up FileReader onload handler
      reader.onload = (readerEvent) => {
        // Create an image object
        const img = new Image();
        
        // Set up image onload handler
        img.onload = () => {
          // Calculate new dimensions maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            height = Math.round(height * (maxWidth / width));
            width = maxWidth;
          }
          
          if (height > maxHeight) {
            width = Math.round(width * (maxHeight / height));
            height = maxHeight;
          }
          
          // Create a canvas and draw the resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          // Draw image on canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the image format (mime type)
          let format = file.type;
          // Default to JPEG if format is not recognized
          if (!['image/jpeg', 'image/png', 'image/webp'].includes(format)) {
            format = 'image/jpeg';
          }
          
          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create image blob'));
            }
          }, format, quality);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        // Load the image
        img.src = readerEvent.target.result;
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      // Read file as a data URL
      reader.readAsDataURL(file);
    });
  },

  // Category management methods
  async getCategories() {
    try {
      const categoriesRef = collection(db, 'categories')
      const categoriesSnap = await getDocs(categoriesRef)

      return categoriesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting categories:', error)
      // Return some default categories
      return [
        { id: 'beaded', name: 'Beaded Jewelry', slug: 'beaded-jewelry' },
        { id: 'string', name: 'String Jewelry', slug: 'string-jewelry' },
        { id: 'metal', name: 'Metal Jewelry', slug: 'metal-jewelry' },
        { id: 'gemstones', name: 'Gemstones', slug: 'gemstones' },
        { id: 'earrings', name: 'Earrings', slug: 'earrings' },
        { id: 'necklaces', name: 'Necklaces', slug: 'necklaces' },
        { id: 'bracelets', name: 'Bracelets', slug: 'bracelets' },
        { id: 'rings', name: 'Rings', slug: 'rings' }
      ]
    }
  },

  async createCategory(categoryData) {
    try {
      const categoriesRef = collection(db, 'categories')
      const docRef = await addDoc(categoriesRef, {
        ...categoryData,
        createdAt: serverTimestamp()
      })
      return {
        id: docRef.id,
        ...categoryData
      }
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  },

  // User management methods
  async getAllUsers() {
    try {
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      
      return usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
    } catch (error) {
      console.error('Error getting all users:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Order operations
  async createOrder(orderData) {
    try {
      // Ensure required fields exist
      const timestamp = serverTimestamp();
      
      const completeOrderData = {
        ...orderData,
        createdAt: timestamp,
        orderDate: orderData.orderDate || timestamp,
        status: orderData.status || 'processing',
        items: Array.isArray(orderData.items) ? orderData.items : []
      };
      
      console.log('Creating order with data:', completeOrderData);
      
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, completeOrderData);
      return docRef;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async getUserOrders(userId) {
    try {
      const ordersRef = collection(db, 'orders');
      
      // Use createdAt for consistent sorting (orderDate might be missing or inconsistent)
      // If you haven't created the index yet, temporarily use a simpler query
      let querySnapshot;
      try {
        const q = query(
          ordersRef, 
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        querySnapshot = await getDocs(q);
      } catch (indexError) {
        // Fallback to a simpler query if index doesn't exist
        console.warn('Index error, using fallback query:', indexError);
        const q = query(
          ordersRef, 
          where('userId', '==', userId)
        );
        querySnapshot = await getDocs(q);
      }
      
      if (querySnapshot.empty) {
        console.log('No orders found for user:', userId);
        return [];
      }
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Order data:', doc.id, data); // Debug what's coming from Firestore
        
        return {
          id: doc.id,
          ...data,
          // Format timestamps properly for display
          orderDate: data.orderDate || data.createdAt || new Date(),
          createdAt: data.createdAt || data.orderDate || new Date(),
          orderNumber: data.orderNumber || `ORD-${doc.id.substring(0, 6)}`,
          status: data.status || 'processing',
          items: data.items || [],
          total: data.total || 0
        };
      });
    } catch (error) {
      console.error('Error getting user orders:', error);
      return []; // Return empty array instead of throwing, better for UI
    }
  },

  // Get all orders for admin
  async getAllOrders() {
    try {
      const ordersRef = collection(db, 'orders');
      let querySnapshot;
      
      try {
        const q = query(
          ordersRef, 
          orderBy('createdAt', 'desc')
        );
        querySnapshot = await getDocs(q);
      } catch (indexError) {
        // Fallback if index doesn't exist
        console.warn('Index error, using fallback query:', indexError);
        querySnapshot = await getDocs(ordersRef);
      }
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        orderNumber: doc.data().orderNumber || `ORD-${doc.id.substring(0, 6)}`,
        status: doc.data().status || 'processing'
      }));
    } catch (error) {
      console.error('Error getting all orders:', error);
      return [];
    }
  },
  
  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { 
        status,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error(`Error updating order ${orderId}:`, error);
      throw error;
    }
  },

  // Helper methods for direct Firestore access
  getFirestore() {
    return db;
  },
  
  getCollection(collectionName) {
    return collection(db, collectionName);
  },
  
  async getDocuments(collectionRef) {
    return await getDocs(collectionRef);
  },
}

export default app