export default function handler(req, res) {
  console.log('Login API called:', req.method, req.url);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Get admin credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  console.log('Environment check:', {
    hasUsername: !!adminUsername,
    hasPassword: !!adminPassword,
    usernameLength: adminUsername ? adminUsername.length : 0,
    passwordLength: adminPassword ? adminPassword.length : 0
  });

  // Check if environment variables are set
  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Validate credentials
  console.log('Login attempt:', {
    providedUsername: username,
    providedPassword: password ? '***' : 'empty',
    expectedUsername: adminUsername,
    usernameMatch: username === adminUsername,
    passwordMatch: password === adminPassword
  });

  if (username === adminUsername && password === adminPassword) {
    // Generate a simple session token (in production, use proper JWT)
    const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    
    console.log('Login successful');
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      sessionToken 
    });
  } else {
    console.log('Login failed - invalid credentials');
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid username or password' 
    });
  }
}
