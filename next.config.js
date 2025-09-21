module.exports = { 
  reactStrictMode: true,
  // Ensure proper handling of API routes in Vercel
  experimental: {
    serverComponentsExternalPackages: ['formidable']
  }
};
