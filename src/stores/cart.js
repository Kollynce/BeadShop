import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Initialize cart from localStorage if available
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
  
  // Calculate total items in cart
  const itemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  // Calculate cart subtotal
  const subtotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    
    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += quantity
    } else {
      // Add new item to cart
      cart.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      })
    }
    
    // Save to localStorage
    updateLocalStorage()
  }
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    const index = cart.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cart.value.splice(index, 1)
      updateLocalStorage()
    }
  }
  
  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      updateLocalStorage()
    }
  }
  
  // Clear cart
  const clearCart = () => {
    cart.value = []
    updateLocalStorage()
  }
  
  // Helper to update localStorage
  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
  
  return {
    cart,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
