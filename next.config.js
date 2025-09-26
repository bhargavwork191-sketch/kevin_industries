module.exports = { 
  reactStrictMode: true,
  // Ensure proper handling of API routes in Vercel
  serverExternalPackages: ['formidable'],
  // Increase body size limit for file uploads
  experimental: {
    serverComponentsExternalPackages: ['formidable']
  },
};
