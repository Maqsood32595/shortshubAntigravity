const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8080';

async function run() {
    console.log('🧪 Starting Phase 2 Verification (Native Fetch)...');

    try {
        // 1. Register
        console.log('\n1. Testing Registration...');
        const registerRes = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: `test_${Date.now()}@example.com`,
                password: 'password123',
                name: 'Test User'
            })
        });
        const registerData = await registerRes.json();
        console.log('   Status:', registerRes.status);
        console.log('   Response:', registerData);

        if (!registerRes.ok) throw new Error('Registration failed');

        // 2. Login
        console.log('\n2. Testing Login...');
        const loginRes = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: registerData.user.email,
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();
        console.log('   Status:', loginRes.status);
        console.log('   Response:', loginData.success ? 'Success' : loginData);

        if (!loginRes.ok) throw new Error('Login failed');
        const token = loginData.token;

        // 3. Upload Video
        console.log('\n3. Testing Video Upload...');

        const dummyVideoPath = path.join(__dirname, 'dummy.mp4');
        fs.writeFileSync(dummyVideoPath, 'fake video content');

        const fileBuffer = fs.readFileSync(dummyVideoPath);
        const blob = new Blob([fileBuffer], { type: 'video/mp4' });

        const formData = new FormData();
        formData.append('video', blob, 'dummy.mp4');

        const uploadRes = await fetch(`${API_URL}/api/upload/video`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        fs.unlinkSync(dummyVideoPath);

        const uploadData = await uploadRes.json();
        console.log('   Status:', uploadRes.status);
        console.log('   Response:', uploadData);

        if (!uploadRes.ok) throw new Error('Upload failed');

        console.log('\n✅ Phase 2 Verification Complete!');
    } catch (error) {
        console.error('\n❌ Verification Failed:', error.message);
        if (error.cause) console.error('   Cause:', error.cause);
        process.exit(1);
    }
}

run();
