const axios = require('axios');

exports.chat = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'text required' });
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: text }]
    }, { headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}`, 'Content-Type': 'application/json' } });
    const reply = resp.data.choices?.[0]?.message?.content || resp.data.choices?.[0]?.text || 'Sorry';
    return res.json({ text: reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ message: 'OpenAI error' });
  }
};
