const express = require('express');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace 'YOUR_OPENAI_API_KEY' with your OpenAI API key
const OPENAI_API_KEY = process.env.APIKEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint for GPT-3 text completion
app.get('/complete', async (req, res) => {
  try {
    const { prompt } = req.query;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    });

    res.json(chatCompletion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
