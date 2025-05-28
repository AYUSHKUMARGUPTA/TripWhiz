import express from 'express';
import tripAdvise from '../controllers/tripAdvise';

const router = express.Router();

router.post('/tripAdvise', [], tripAdvise);



export default router;