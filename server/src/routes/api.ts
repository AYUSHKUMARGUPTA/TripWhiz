import express, { Request, Response, NextFunction } from 'express';
import tripAdvise from '../controllers/tripAdvise';
import { google } from 'googleapis';

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
// router.post('/analyze', [], analyze);
// router.post('/portfolio', [], portfolio);
router.post('/tripAdvise', [], tripAdvise);

router.get('/auth', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  res.redirect(url);
});

// Step 2: Handle the OAuth2 callback
router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code as string;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // You could store tokens in session or DB
  req.session.tokens = tokens;

  res.send('Authentication successful! You can close this tab.');
});

export default router;