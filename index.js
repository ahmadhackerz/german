const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

router.post('/generate-exam', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Generate a German language exam based on the following requirements: ${message}`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const exam = response.data.choices[0].text;
    res.json({ exam });
  } catch (error) {
    console.error('Error generating exam:', error);
    res.status(500).send('Error generating exam');
  }
});

app.use('/api', router);

module.exports = app;
