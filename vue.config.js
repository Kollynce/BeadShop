module.exports = {
  // This is important for GitHub Pages to work with Vue Router
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  // If you're using a custom domain, leave publicPath as '/'
  // If you're using GitHub's default domain (username.github.io/repo-name),
  // then set publicPath to '/repo-name/'
}
