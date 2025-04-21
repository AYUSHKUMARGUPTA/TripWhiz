const express = require('express');
const router = express.Router();
const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  saveTrip
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTrip)
  .get(protect, getTrips);

router.route('/:id')
  .get(protect, getTripById)
  .put(protect, updateTrip)
  .delete(protect, deleteTrip);

router.put('/:id/save', protect, saveTrip);

module.exports = router;