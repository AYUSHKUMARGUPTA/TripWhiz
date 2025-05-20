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



export default router;