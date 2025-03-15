export const DEFAULT_ADMIN = {
  email: 'admin@beabedart.com', // Change this to your admin email
  password: 'Admin@123!', // Change this in production
  userData: {
    firstName: 'System',
    lastName: 'Administrator',
    isAdmin: true,
    isSuperAdmin: true, // Cannot be removed
    createdAt: new Date(),
  }
}
