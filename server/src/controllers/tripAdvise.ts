import { type RequestHandler } from 'express';
import axios from 'axios';
import { getCalendarClient } from '../utils/googleAuth';
import { fetchGoogleMapsLink, fetchYouTubeVideoLink, fetchImageLink } from '../utils/enrichPlace';

const createCalendarEvents = async (itinerary: any, token: any) => {
  const calendar = getCalendarClient(token);

  for (const event of itinerary) {
    const { place, date_time, location } = event;

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: place,
        location,
        description: `Part of your AI-generated trip itinerary`,
        start: { dateTime: date_time, timeZone: 'America/Los_Angeles' },
        end: {
          dateTime: new Date(new Date(date_time).getTime() + 2 * 60 * 60 * 1000).toISOString(),
          timeZone: 'America/Los_Angeles',
        },
      },
    });
  }
};

const tripAdvise: RequestHandler = async (req, res) => {
  const { name, destination, startDate, endDate, preferences, googleCalendarSync } = req.body;

  const prompt = `
  Create a day-by-day itinerary for ${name}, visiting ${destination} from ${startDate} to ${endDate}.
  They enjoy ${preferences.join(', ')}.
  
  For each activity, provide:
  - "place": Name of the place or activity
  - "date_time": Scheduled date and time in "YYYY-MM-DD HH:MM" format
  
  Output only a raw JSON array. No markdown, no explanations.
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const candidates = response.data.candidates;
    let content = candidates?.[0]?.content?.parts?.[0]?.text || '[]';

    content = content.trim().replace(/^```json\n?/, '').replace(/```$/, '');

    const basicItinerary = JSON.parse(content);

    // Enrich each place
    const enrichedItinerary = await Promise.all(
      basicItinerary.map(async (item: any) => {
        const location = await fetchGoogleMapsLink(item.place);
        const youtube = await fetchYouTubeVideoLink(item.place);
        const image = await fetchImageLink(item.place);

        return {
          ...item,
          location,
          youtube,
          image,
        };
      })
    );

    res.json({ itinerary: enrichedItinerary });

    if (googleCalendarSync && req.session?.tokens) {
      await createCalendarEvents(enrichedItinerary, req.session.tokens);
    }
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
};

export default tripAdvise;
