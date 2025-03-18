import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNotificationStore } from './notification'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    loading: false
  }),

  getters: {
    itemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    
    subtotal: (state) => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  },

  actions: {
    async addToCart(product, quantity = 1) {
      const notificationStore = useNotificationStore()
      
      try {
        const existingItem = this.cart.find(item => item.id === product.id)
        
        if (existingItem) {
          existingItem.quantity += quantity
          notificationStore.addNotification({
            title: 'Cart Updated',
            message: `Increased ${product.name} quantity by ${quantity}`,
            type: 'success',
            timeout: 3000
          })
        } else {
          this.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || product.image,
            quantity: quantity
          })
          notificationStore.addNotification({
            title: 'Added to Cart',
            message: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`,
            type: 'success',
            timeout: 3000
          })
        }
      } catch (error) {
        console.error('Error adding to cart:', error)
        notificationStore.addNotification({
          title: 'Error',
          message: 'Failed to add item to cart',
          type: 'error',
          timeout: 5000
        })
      }
    },

    async updateQuantity(productId, newQuantity) {
      const notificationStore = useNotificationStore()
      
      try {
        const item = this.cart.find(item => item.id === productId)
        if (item) {
          const oldQuantity = item.quantity
          item.quantity = newQuantity
          notificationStore.addNotification({
            title: 'Cart Updated',
            message: `Updated ${item.name} quantity from ${oldQuantity} to ${newQuantity}`,
            type: 'success',
            timeout: 3000
          })
        }
      } catch (error) {
        console.error('Error updating quantity:', error)
        notificationStore.addNotification({
          title: 'Error',
          message: 'Failed to update item quantity',
          type: 'error',
          timeout: 5000
        })
      }
    },

    async removeFromCart(productId) {
      const notificationStore = useNotificationStore()
      
      try {
        const itemIndex = this.cart.findIndex(item => item.id === productId)
        if (itemIndex > -1) {
          const item = this.cart[itemIndex]
          this.cart.splice(itemIndex, 1)
          notificationStore.addNotification({
            title: 'Item Removed',
            message: `${item.name} has been removed from your cart`,
            type: 'info',
            timeout: 3000
          })
        }
      } catch (error) {
        console.error('Error removing from cart:', error)
        notificationStore.addNotification({
          title: 'Error',
          message: 'Failed to remove item from cart',
          type: 'error',
          timeout: 5000
        })
      }
    },

    clearCart() {
      this.cart = []
    }
  }
})
