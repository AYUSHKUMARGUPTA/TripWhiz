const asyncHandler = require('express-async-handler');
const Trip = require('../models/tripModel');

const createTrip = asyncHandler(async (req, res) => {
  const {
    destination,
    dates,
    image,
    description,
    activities
  } = req.body;

  const trip = await Trip.create({
    user: req.user._id,
    destination,
    dates,
    image,
    description,
    activities
  });

  res.status(201).json(trip);
});

const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ user: req.user._id });
  res.json(trips);
});

const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    res.json(trip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    trip.destination = req.body.destination || trip.destination;
    trip.dates = req.body.dates || trip.dates;
    trip.image = req.body.image || trip.image;
    trip.description = req.body.description || trip.description;
    trip.activities = req.body.activities || trip.activities;

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    await trip.deleteOne();
    res.json({ message: 'Trip removed' });
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

const saveTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (trip && trip.user.toString() === req.user._id.toString()) {
    trip.saved = !trip.saved;
    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } else {
    res.status(404);
    throw new Error('Trip not found');
  }
});

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  saveTrip,
};