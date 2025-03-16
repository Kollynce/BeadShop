module.exports = {
  // ...existing code...
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // For GitHub Pages, you might need to set this to your repo name if not using a custom domain
  // publicPath: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
  // ...existing code...
}
