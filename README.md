# TripWhiz

TripWhiz is a mobile application that helps users plan, enrich, and manage their travel itineraries seamlessly. It leverages AI for itinerary generation, integrates with Google Calendar, and stores trip data for future reference.

---

## Features

- **AI-powered trip itinerary generation** using Gemini API
- **Trip enrichment** with Google Maps, YouTube, and image links
- **Google Calendar integration** for event syncing
- **Save and view past trips** from the database
- **User-friendly mobile interface** built with React Native and Expo

---

## Architecture

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Expo CLI (`npm install -g expo-cli`)
- Google Cloud credentials for Calendar API
- Gemini API key

### Setup

1. **Clone the repository**
    ```sh
    git clone <repo-url>
    cd TripWhiz
    ```

2. **Install dependencies**
    - For backend:
      ```sh
      cd server
      npm install
      ```
    - For frontend:
      ```sh
      cd Frontend
      npm install
      ```

3. **Configure environment variables**
    - Backend: Create a `.env` file in [server](http://_vscodecontentref_/0) with your MongoDB URI, Gemini API key, and Google credentials.

4. **Start the backend server**
    ```sh
    cd server
    npm start
    ```

5. **Start the mobile app**
    ```sh
    cd Frontend
    npx expo start
    ```

---

## Usage

- **Plan a trip:** Enter trip details in the Home tab and submit.
- **View summary:** See the AI-generated itinerary and enrichments.
- **Save trip:** Trip is automatically saved to the database.
- **View past trips:** Go to the Trips tab to see and revisit previous trips.

---

## Project Structure

Mobile App (React Native/Expo) | v Express Backend (Node.js) | v MongoDB Atlas | v External APIs (Gemini, Google Calendar, Maps, YouTube)

Structure
TripWhiz/ 
├── Frontend/ # React Native app 
│ └── app/ 
│ ├── (tabs)/ 
│ ├── SummaryScreen.tsx 
│ └── ... 
├── server/ # Express backend 
│ └── src/ 
│ ├── controllers/ 
│ ├── models/ 
│ └── ... 
└── Readme.md

---

## Conclusion

1. Seamless trip planning experience  
2. Efficient data storage and retrieval  
3. Integration with external travel APIs  
4. User-friendly mobile interface  

---

## License

MIT