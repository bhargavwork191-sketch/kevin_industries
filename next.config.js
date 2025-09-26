module.exports = { 
  reactStrictMode: true,
  // Ensure proper handling of API routes in Vercel
  serverExternalPackages: ['formidable'],
  // Configure API routes for larger file uploads
  experimental: {
    serverComponentsExternalPackages: ['formidable']
  },
  // Increase body size limit for API routes
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
