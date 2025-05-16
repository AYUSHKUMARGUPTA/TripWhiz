import { Request, Response } from 'express';
import Trip from '../models/Trip';
import { generateTripPlan } from '../utils/gemini';
import { fetchGoogleMapsLink, fetchYouTubeVideoLink, fetchImageLink } from '../utils/enrichPlace';

interface TripAdviseRequest {
  destination: string;
  duration: number;
  preferences: string[];
  budget: number;
}

interface Activity {
  name: string;
  description: string;
  estimatedCost: number;
  duration: number;
  timeSlot: string;
  mapsLink?: string;
  videoLink?: string;
  imageLink?: string;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

interface TripPlan {
  userId: string;
  destination: string;
  duration: number;
  preferences: string[];
  budget: number;
  suggestions: DayPlan[];
  totalEstimatedCost: number;
  warnings: string[];
}

const tripAdvise = async (req: Request<{}, {}, TripAdviseRequest>, res: Response) => {
  try {
    const { destination, duration, preferences, budget } = req.body;
    const userId = req.session?.userId || 'anonymous';

    // Generate trip plan using Gemini API
    const generatedPlan = await generateTripPlan(destination, duration, preferences, budget);

    if (!generatedPlan.success) {
      throw new Error('Failed to generate trip plan');
    }

    // Parse the generated plan and create a structured response
    const tripPlan: TripPlan = {
      userId,
      destination,
      duration,
      preferences,
      budget,
      suggestions: [
        {
          day: 1,
          activities: [
            {
              name: "Sample Activity",
              description: "This is a sample activity",
              estimatedCost: 50,
              duration: 120, // 2 hours
              timeSlot: "10:00 AM"
            }
          ]
        }
      ],
      totalEstimatedCost: 50,
      warnings: []
    };

    // Enrich the plan with additional information
    for (const day of tripPlan.suggestions) {
      for (const activity of day.activities) {
        const [mapsLink, videoLink, imageLink] = await Promise.all([
          fetchGoogleMapsLink(activity.name),
          fetchYouTubeVideoLink(activity.name),
          fetchImageLink(activity.name)
        ]);

        activity.mapsLink = mapsLink;
        activity.videoLink = videoLink;
        activity.imageLink = imageLink;
      }
    }

    // Save the trip plan to MongoDB
    const trip = new Trip(tripPlan);
    await trip.save();

    res.json(trip);
  } catch (error) {
    console.error('Error in tripAdvise:', error);
    res.status(500).json({ error: 'Failed to generate trip advice' });
  }
};

export default tripAdvise;
