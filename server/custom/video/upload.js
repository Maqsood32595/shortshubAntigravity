const multer = require('multer');
const path = require('path');
const db = require('../../utils/db');
const { verifyToken } = require('../../utils/auth');
const { uploadFile } = require('../../utils/storage');

// Configure storage - use memory storage for GCS upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('video');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        console.log('🔵 [Upload] Request received');
        console.log('   - Content-Type:', req.headers['content-type']);

        // Verify auth first
        const user = verifyToken(req);
        if (!user) {
            console.log('❌ [Upload] Unauthorized');
            res.status(401);
            return resolve({ error: 'Unauthorized' });
        }
        console.log('✅ [Upload] User authenticated:', user.email);

        upload(req, res, async (err) => {
            if (err) {
                console.error('❌ [Upload] Multer error:', err);
                return reject(err);
            }

            console.log('📦 [Upload] File processed. req.file:', req.file ? 'Present' : 'Missing');
            if (req.file) {
                console.log('   - Original Name:', req.file.originalname);
                console.log('   - Size:', req.file.size);
                console.log('   - Mime Type:', req.file.mimetype);
            }

            if (!req.file) {
                console.log('❌ [Upload] No file in request');
                res.status(400);
                return resolve({ error: 'No video file uploaded' });
            }

            try {
                // Upload to GCS with user email in path
                // Structure: bucket/{email}/uploaded/{filename}
                const filename = `${Date.now()}-${req.file.originalname}`;
                const destination = `${user.email}/uploaded/${filename}`;

                console.log('🚀 [Upload] Uploading to GCS:', destination);
                const gcsResult = await uploadFile(req.file, destination);
                console.log('✅ [Upload] GCS Upload complete:', gcsResult.path);

                // Create video record
                const video = {
                    id: 'vid_' + Date.now(),
                    userId: user.userId,
                    userEmail: user.email, // Store email for reference
                    title: req.file.originalname,
                    filename: filename,
                    originalName: req.file.originalname,
                    path: gcsResult.path, // Store GCS URI
                    size: req.file.size,
                    mimeType: req.file.mimetype,
                    createdAt: new Date().toISOString(),
                    status: 'processed'
                };

                await db.createVideo(video);

                resolve({
                    success: true,
                    videoId: video.id,
                    message: 'Video uploaded successfully to GCS'
                });
            } catch (uploadError) {
                console.error('❌ [Upload] GCS Upload Error:', uploadError);
                res.status(500);
                resolve({ error: 'Failed to upload video to storage' });
            }
        });
    });
};
