import { type RequestHandler } from 'express';
import axios from 'axios';
import { getCalendarClient } from '../utils/googleAuth';


const createCalendarEvents = async (itinerary:any, token:any) => {
    const calendar = getCalendarClient(token);
  
    for (const event of itinerary) {
      const { name, dateTime, location } = event;
      
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: name,
          location,
          description: `Part of your AI-generated trip itinerary`,
          start: { dateTime, timeZone: 'America/Los_Angeles' },
          end: { dateTime: new Date(new Date(dateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(), timeZone: 'America/Los_Angeles' },
        },
      });
    }
  };

const tripAdvise: RequestHandler = async (req, res) => {
    const { name, destination, startDate, endDate, preferences, googleCalendarSync } = req.body;

    const prompt = `
    Create a day-by-day itinerary for ${name}, who is visiting ${destination} from ${startDate} to ${endDate}.
    They enjoy ${preferences.join(', ')}.
    
    For each activity in the itinerary, provide:
    - Name of the place
    - A high-quality image link (JPG/PNG) of the place from a reliable source (do not return base64 or placeholder text)
    - Scheduled date and time
    - Location (with a Google Maps link)
    - An actual YouTube video link (https://www.youtube.com/watch?v=...) of the place or activity. Do not return a YouTube search query link.
    
    Respond strictly in raw JSON array format. Do NOT use markdown or explain anything.
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const candidates = response.data.candidates;
        let content = candidates?.[0]?.content?.parts?.[0]?.text || '[]';

        // Remove markdown code block if present
        content = content.trim().replace(/^```json\n?/, '').replace(/```$/, '');

        res.json({ itinerary: JSON.parse(content) });
        if (googleCalendarSync && req.session?.tokens) {
            const itinerary = JSON.parse(content);
            await createCalendarEvents(itinerary,req.session?.tokens);
        }
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
};

export default tripAdvise;