# Jewelry Shop

A Vue.js e-commerce application for a jewelry store.

## Project Setup

```sh
npm install
```

### Environment Setup

Create a `.env` file in the root directory and add your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Features

- User authentication (login, register, profile management)
- Product browsing and filtering
- Shopping cart functionality
- Checkout process
- Order history
- Responsive design with Tailwind CSS
- Firebase integration for database and authentication

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Set up the following collections:
   - products
   - users
   - orders

## Firestore Data Structure

### Products Collection
```
{
  "name": "Diamond Ring",
  "description": "Beautiful diamond ring with 18k gold band",
  "price": 1299.99,
  "image": "https://example.com/images/diamond-ring.jpg",
  "category": "rings",
  "featured": true,
  "inStock": true,
  "features": [
    "18k gold band",
    "0.5 carat diamond",
    "Handcrafted"
  ]
}
```

### Users Collection
```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "createdAt": Timestamp
}
```

### Orders Collection
```
{
  "userId": "user_id_here",
  "items": [
    {
      "id": "product_id_here",
      "name": "Diamond Ring",
      "price": 1299.99,
      "quantity": 1
    }
  ],
  "subtotal": 1299.99,
  "shipping": 0,
  "total": 1299.99,
  "status": "processing",
  "createdAt": Timestamp,
  "shippingInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```
