import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import tripAdvise from '../controllers/tripAdvise';
import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// session type extension
declare module 'express-session' {
  export interface Session {
    tokens?: any;
    userId?: string;
  }
}

const router = Router();

// OAuth 2.0 client configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/oauth2callback'  // /api 프리픽스 추가
);

router.post('/tripAdvise', tripAdvise);

const handleAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Missing OAuth configuration');
      res.status(500).json({ error: 'OAuth configuration error' });
      return;
    }

    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true
    });

    console.log('Auth URL:', url);
    res.json({ url });
  } catch (error) {
    next(error);
  }
};

const handleCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const code = req.query.code as string;
    if (!code) {
      res.status(400).json({ error: 'No code provided' });
      return;
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    // Store tokens and user info in session
    req.session.tokens = tokens;
    req.session.userId = userInfo.data.id ?? undefined;

    // Redirect to frontend with success
    res.redirect(`${process.env.CLIENT_URL}/auth-success`);
  } catch (error) {
    next(error);
  }
};

router.get('/auth', handleAuth as any);
router.get('/oauth2callback', handleCallback as any);

export default router;