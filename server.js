const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

const API_KEY = '16ec9641eb3b05977ffff64ecec57402';
const API_URL = 'https://smmpanelone.com/api/v2';

app.post('/create-order', async (req, res) => {
    const { service, link, quantity } = req.body;

    try {
        const response = await axios.post(API_URL, new URLSearchParams({
            key: API_KEY,
            action: 'add',
            service: service,
            link: link,
            quantity: quantity
        }));

        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
