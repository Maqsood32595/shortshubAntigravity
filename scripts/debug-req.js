const API_URL = 'http://localhost:5004';

async function run() {
    try {
        console.log('Sending register request...');
        const res = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: `debug_${Date.now()}@example.com`,
                password: 'password123',
                name: 'Debug User'
            })
        });

        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Body:', text);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

run();
