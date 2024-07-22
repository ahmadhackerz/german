const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/generate-exam', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: message,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const exam = response.data.choices[0].text.trim();
    res.status(200).json({ exam });
  } catch (error) {
    console.error('Error generating exam:', error);
    res.status(500).json({ error: 'Error generating exam' });
  }
});

module.exports = app;
