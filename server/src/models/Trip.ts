import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  estimatedCost: { type: Number, required: true },
  location: { type: String },
  duration: { type: Number }, // in minutes
  timeSlot: { type: String },
  mapsLink: { type: String },
  videoLink: { type: String },
  imageLink: { type: String }
});

const dayPlanSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  activities: [activitySchema]
});

const tripSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: Number, required: true }, // in days
  preferences: [{ type: String }],
  budget: { type: Number, required: true },
  suggestions: [dayPlanSchema],
  totalEstimatedCost: { type: Number, required: true },
  warnings: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

tripSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip; 