import app from './utils/app' // (server)
import mongo from './utils/mongo' // (database)
import { PORT } from './constants/index'
import authRoutes from './routes/auth'
import apiRoutes from './routes/api';
import { google } from 'googleapis';
import { oauth2Client } from './utils/googleAuth';
const bootstrap = async () => {
  await mongo.connect()

  app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
  })

  app.get('/healthz', (req, res) => {
    res.status(204).end()
  })

app.get('/auth', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  console.log("url", url)
  res.redirect(url);
});

// Step 2: Handle the OAuth2 callback
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    req.session.tokens = tokens;

    res.send(`
      <h2>Authentication successful!</h2>
      <p>You can now return to your app and use the /tripAdvise API.</p>
    `);
  } catch (error: any) {
    console.error("OAuth2 Error:", error.message);
    res.status(500).send('Authentication failed');
  }
});

  app.use('/api', apiRoutes);

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`)
  })
}

bootstrap()
