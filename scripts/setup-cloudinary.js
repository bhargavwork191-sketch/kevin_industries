const path = require('path');
const fs = require('fs');

console.log('Cloudinary Setup Script');
console.log('======================');

// Check environment variables
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

console.log('\nChecking environment variables:');
let allPresent = true;

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: Set`);
  } else {
    console.log(`❌ ${envVar}: Missing`);
    allPresent = false;
  }
});

if (!allPresent) {
  console.log('\n❌ Some environment variables are missing.');
  console.log('Please set the following in your .env.local file:');
  requiredEnvVars.forEach(envVar => {
    console.log(`${envVar}=your_value_here`);
  });
  process.exit(1);
}

console.log('\n✅ All Cloudinary environment variables are set!');
console.log('\nYou can now use Cloudinary features in your application.');

// Create a test configuration file
const configFile = path.join(process.cwd(), 'cloudinary-config.json');
const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  setup_date: new Date().toISOString(),
  status: 'configured'
};

fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
console.log(`\nConfiguration saved to: ${configFile}`);
console.log('\n🎉 Cloudinary setup complete!');
