import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON with limit for image uploads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Authorized Administrator identity is securely kept on the server
// Never exposed to frontend or in public client responses
const AUTHORIZED_ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'farmnaligaming@gmail.com').toLowerCase().trim();
const DATA_FILE = path.join(process.cwd(), 'portfolio-data.json');
const SERVER_AUTH_STORE = path.join(process.cwd(), '.server-auth.json');

// SHA-256 pre-hash fallback (ensures zero plaintext passwords exist in code)
const INITIAL_AUTH_HASH = '3eb3fe66b31e3b4d10fa70b5cad49c7112294af6ae4e476a1c405155d45aa121';

function getAdminPasswordHash(): string {
  if (process.env.ADMIN_PASSWORD) {
    return crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD).digest('hex');
  }
  if (fs.existsSync(SERVER_AUTH_STORE)) {
    try {
      const data = JSON.parse(fs.readFileSync(SERVER_AUTH_STORE, 'utf8'));
      if (data && typeof data.hash === 'string') {
        return data.hash;
      }
    } catch {
      // ignore
    }
  }
  return INITIAL_AUTH_HASH;
}

// Active authenticated administrator session tokens: token -> { email: string, expiresAt: number }
const serverSessions = new Map<string, { email: string; expiresAt: number }>();

// Periodic cleanup of expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of serverSessions.entries()) {
    if (session.expiresAt < now) {
      serverSessions.delete(token);
    }
  }
}, 60 * 1000);

/**
 * Verifies a Firebase ID token using Google Identity Toolkit API
 */
async function verifyFirebaseIdToken(idToken: string): Promise<{ email: string; emailVerified: boolean; uid: string } | null> {
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) return null;
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const user = data.users?.[0];
    if (!user || !user.email) return null;

    return {
      email: user.email,
      emailVerified: Boolean(user.emailVerified),
      uid: user.localId,
    };
  } catch (err) {
    console.error('Error verifying Firebase token:', err);
    return null;
  }
}

/**
 * Checks whether the verified user matches the authorized administrator email
 */
function isAuthorizedAdmin(email: string): boolean {
  return email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL;
}

/**
 * Validates a Bearer token (supports both server sessions and Firebase ID tokens)
 */
async function validateAdminToken(token: string): Promise<boolean> {
  // 1. Check server-issued session tokens
  const session = serverSessions.get(token);
  if (session && session.expiresAt > Date.now()) {
    return isAuthorizedAdmin(session.email);
  }

  // 2. Check Firebase ID tokens
  const firebaseUser = await verifyFirebaseIdToken(token);
  if (firebaseUser && isAuthorizedAdmin(firebaseUser.email)) {
    return true;
  }

  return false;
}

/**
 * Middleware requiring valid Administrator Authentication
 */
async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: Public visitors have read-only access. Administrator authentication required.',
      code: 'AUTH_REQUIRED',
    });
  }

  const token = authHeader.split(' ')[1];
  const isValid = await validateAdminToken(token);

  if (!isValid) {
    return res.status(403).json({
      error: 'Access denied: Administrator authorization required.',
      code: 'ACCESS_FORBIDDEN',
    });
  }

  next();
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 2. Public Read-Only Portfolio Content
app.get('/api/portfolio', (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      return res.json({ success: true, data });
    }
    res.json({ success: true, data: null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown read error';
    res.status(500).json({ error: 'Failed to read portfolio data: ' + message });
  }
});

// 3. Administrator Email / Password Login Endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Check authorized administrator account
  if (!isAuthorizedAdmin(email)) {
    return res.status(401).json({
      error: 'Invalid administrator credentials. Please check your email and password.',
    });
  }

  const inputHash = crypto.createHash('sha256').update(String(password).trim()).digest('hex');
  const validHash = getAdminPasswordHash();
  const envPasswordMatch = process.env.ADMIN_PASSWORD && String(password).trim() === process.env.ADMIN_PASSWORD;

  if (inputHash !== validHash && !envPasswordMatch) {
    return res.status(401).json({
      error: 'Invalid administrator credentials. Please check your email and password.',
    });
  }

  // Generate cryptographically secure session token (24 hours)
  const token = 'fa_sec_' + crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  serverSessions.set(token, { email: AUTHORIZED_ADMIN_EMAIL, expiresAt });

  res.json({
    success: true,
    token,
    role: 'admin',
    expiresAt,
  });
});

// 4. Verify Admin Token (Firebase ID token or Server Session token)
app.post('/api/admin/verify', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ authorized: false, error: 'Missing authorization token.' });
  }

  const token = authHeader.split(' ')[1];
  const isValid = await validateAdminToken(token);

  if (!isValid) {
    return res.status(403).json({
      authorized: false,
      error: 'Access denied: This account is not authorized as an administrator of this portfolio.',
    });
  }

  res.json({
    authorized: true,
    role: 'admin',
  });
});

// 5. Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    serverSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// 6. Admin Update Password (Protected)
app.post('/api/admin/change-password', requireAdmin, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const newHash = crypto.createHash('sha256').update(newPassword.trim()).digest('hex');
  try {
    fs.writeFileSync(SERVER_AUTH_STORE, JSON.stringify({ hash: newHash, updatedAt: new Date().toISOString() }, null, 2), 'utf8');
    res.json({ success: true, message: 'Administrator password updated successfully.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Storage error';
    res.status(500).json({ error: 'Failed to persist password: ' + message });
  }
});

// 7. Admin Update Portfolio Data (Strictly Protected by requireAdmin)
app.put('/api/portfolio', requireAdmin, (req, res) => {
  try {
    const portfolioData = req.body;
    if (!portfolioData || typeof portfolioData !== 'object') {
      return res.status(400).json({ error: 'Invalid portfolio data payload.' });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(portfolioData, null, 2), 'utf8');
    res.json({ success: true, message: 'Portfolio updated successfully by authorized administrator.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown write error';
    res.status(500).json({ error: 'Failed to write portfolio data: ' + message });
  }
});

// ==========================================
// Vite Middleware & Static Serving
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FA GROUP Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
