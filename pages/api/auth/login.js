export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Get admin credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Check if environment variables are set
  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Validate credentials
  if (username === adminUsername && password === adminPassword) {
    // Generate a simple session token (in production, use proper JWT)
    const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      sessionToken 
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid username or password' 
    });
  }
}
