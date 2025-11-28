const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5005';

async function run() {
    console.log('🧪 Starting Phase 3 Verification (Read Endpoints)...');

    try {
        // 1. Register & Login to get token
        console.log('\n1. Authenticating...');
        const registerRes = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: `test_p3_${Date.now()}@example.com`,
                password: 'password123',
                name: 'Phase3 User'
            })
        });
        const registerData = await registerRes.json();

        const loginRes = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: registerData.user.email,
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('   ✅ Authenticated');

        // 2. Upload a video so we have something to list
        console.log('\n2. Uploading test video...');
        const dummyVideoPath = path.join(__dirname, 'dummy_p3.mp4');
        fs.writeFileSync(dummyVideoPath, 'fake video content');
        const fileBuffer = fs.readFileSync(dummyVideoPath);
        const blob = new Blob([fileBuffer], { type: 'video/mp4' });
        const formData = new FormData();
        formData.append('video', blob, 'phase3_test.mp4');

        const uploadRes = await fetch(`${API_URL}/api/upload/video`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        fs.unlinkSync(dummyVideoPath);

        if (!uploadRes.ok) throw new Error('Upload failed');
        console.log('   ✅ Uploaded');

        // 3. Test Public List
        console.log('\n3. Testing GET /api/video/list...');
        const listRes = await fetch(`${API_URL}/api/video/list`);
        const listData = await listRes.json();
        console.log('   Status:', listRes.status);
        console.log('   Count:', listData.videos?.length);

        if (!listData.success || !Array.isArray(listData.videos)) {
            throw new Error('Public list failed');
        }
        if (listData.videos.length === 0) {
            throw new Error('Public list is empty despite upload');
        }
        console.log('   ✅ Public list verified');

        // 4. Test User List
        console.log('\n4. Testing GET /api/video/user-list...');
        const userListRes = await fetch(`${API_URL}/api/video/user-list`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const userListData = await userListRes.json();
        console.log('   Status:', userListRes.status);
        console.log('   Count:', userListData.videos?.length);

        if (!userListData.success || !Array.isArray(userListData.videos)) {
            throw new Error('User list failed');
        }
        if (userListData.videos.length === 0) {
            throw new Error('User list is empty despite upload');
        }
        console.log('   ✅ User list verified');

        console.log('\n✅ Phase 3 Verification Complete!');
    } catch (error) {
        console.error('\n❌ Verification Failed:', error.message);
        process.exit(1);
    }
}

run();
