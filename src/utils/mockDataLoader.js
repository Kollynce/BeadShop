import productsData from '../data/products.json'

// Fallback products in case JSON data is missing or empty
const fallbackProducts = [
  {
    id: "default-1",
    name: "Classic Pearl Necklace",
    description: "Elegant freshwater pearl necklace, perfect for any occasion.",
    price: 129.99,
    image: "https://via.placeholder.com/400x400?text=Pearl+Necklace",
    category: "necklaces",
    material: "Freshwater pearls",
    beadSize: "8mm",
    length: "18 inches",
    closure: "Silver lobster clasp"
  },
  {
    id: "default-2",
    name: "Amethyst Beaded Bracelet",
    description: "Stunning amethyst beads with sterling silver accents.",
    price: 79.99,
    image: "https://via.placeholder.com/400x400?text=Amethyst+Bracelet",
    category: "bracelets",
    material: "Amethyst",
    beadSize: "6mm",
    length: "7.5 inches",
    closure: "Toggle clasp"
  }
]

export const mockDataLoader = {
  getProducts() {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // Check if products exist, otherwise use fallback
        const products = productsData?.products && productsData.products.length > 0 
          ? productsData.products 
          : fallbackProducts
        
        resolve(products)
      }, 500)
    })
  },
  
  // Get a single product by ID
  getProductById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Get all products first
        const products = await this.getProducts()
        
        // Normalize the ID for comparison
        const searchId = String(id).toLowerCase()
        
        // Try multiple matching strategies
        let product = products.find(p => 
          String(p.id).toLowerCase() === searchId ||
          String(p.id).toLowerCase().includes(searchId) ||
          searchId.includes(String(p.id).toLowerCase())
        )
        
        // If product not found by ID, use first product as fallback
        if (!product && products.length > 0) {
          console.warn(`Product with ID ${id} not found. Using first product as fallback.`)
          product = products[0]
        }
        
        if (product) {
          resolve(product)
        } else {
          reject(new Error(`Product with ID ${id} not found and no fallbacks available`))
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  
  // Alias for consistency
  getProduct(id) {
    return this.getProductById(id)
  },
  
  // Get all products (redundant but kept for API consistency)
  getAllProducts() {
    return this.getProducts()
  }
}
