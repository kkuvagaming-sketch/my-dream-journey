const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

const API_KEY = 'd516d5d1f77c1b2ea7a025bbfea03634';
const API_URL = 'https://smmpanelone.com/api/v2';

// Google Auth Route (Temporary redirect or handler)
app.get('/auth/google', (req, res) => {
    // यहाँ पर हम Google OAuth का मुख्य लॉगिन URL या रीडायरेक्ट सेट करेंगे
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    
    if (!googleClientId) {
        return res.status(500).send("Google Client ID is not configured on Render environment variables.");
    }
    
    const redirectUri = `${req.protocol}://${req.get('host')}/auth/google/callback`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile`;
    
    res.redirect(googleAuthUrl);
});

// Google Auth Callback Route
app.get('/auth/google/callback', (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send("Google Authentication failed: No code received.");
    }
    // सफल लॉगिन के बाद यूज़र को होमपेज पर भेज दें या सफलता संदेश दिखाएं
    res.send("<h2>गूगल से लॉगिन सफलतापूर्वक हो गया है! (Google Login Successful)</h2><a href='/'>वापस जाएं (Back to Home)</a>");
});

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
