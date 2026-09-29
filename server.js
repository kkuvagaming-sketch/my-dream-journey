<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Dream Journey - SMM Panel</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f9; padding: 20px; text-align: center; }
        .form-container { background: white; max-width: 400px; margin: auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        select, input, button { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; }
        button { background: #28a745; color: white; font-size: 16px; border: none; cursor: pointer; }
        button:hover { background: #218838; }
    </style>
</head>
<body>

    <div class="form-container">
        <h2>SMM Panel Order</h2>

        <!-- Google Login Button को यहाँ से पूरी तरह हटा दिया गया है -->

        <form id="orderform">
            <label for="service">सेवा चुनें (Select Service)</label>
            <select id="service" required>
                <option value="9059">YouTube Subscribers (1K) - ₹1,700</option>
                <option value="7183">YouTube Likes (1K) - ₹150</option>
                <option value="8533">YouTube Views (1K) - ₹150</option>
                <option value="11135">Instagram Video Views (1K) - ₹150</option>
            </select>

            <label for="link">लिंक (Link)</label>
            <input type="text" id="link" placeholder="कृपया लिंक या यूजरनेम यहाँ डालें" required>

            <label for="quantity">मात्रा (Quantity)</label>
            <input type="number" id="quantity" value="1000" min="100" required>

            <button type="submit">ऑर्डर दें (Place Order)</button>
        </form>

        <p id="statusMsg" style="margin-top: 15px; font-weight: bold;"></p>
    </div>

    <script>
        document.getElementById('orderform').addEventListener('submit', async (e) => {
            e.preventDefault();
            const msg = document.getElementById('statusMsg');
            msg.style.color = "blue";
            msg.innerText = "ऑर्डर भेजा जा रहा है...";

            const payload = {
                service: document.getElementById('service').value,
                link: document.getElementById('link').value,
                quantity: document.getElementById('quantity').value
            };

            try {
                const res = await fetch('/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await res.json();
                if (result.success) {
                    msg.style.color = "green";
                    msg.innerText = "ऑर्डर सफलतापूर्वक सबमिट हो गया है!";
                } else {
                    msg.style.color = "red";
                    msg.innerText = "ऑर्डर देने में भूल: " + (result.error || 'त्रुटि');
                }
            } catch (err) {
                msg.style.color = "red";
                msg.innerText = "कनेक्शन एरर: " + err.message;
            }
        });
    </script>

</body>
</html>
