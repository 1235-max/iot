const express = require('express');
const axios = require('axios');
const router = express.Router();

// Replace with your actual channel ID and API key
const channelID = "2911154";   // <-- String
const readAPIKey = "PDCDB455C703IJ6C";  // <-- String

// Dashboard route
router.get('/dashboard', async (req, res) => {
  res.render('dashboardPatient', { user: req.session.user }); 
});

// Fetch vitals route
router.get('/vitals', async (req, res) => {
  try {
    const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=10`;
    const response = await axios.get(url);
    res.json(response.data.feeds);
  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error.message);
    res.status(500).send('Error fetching vitals');
  }
});

module.exports = router;
