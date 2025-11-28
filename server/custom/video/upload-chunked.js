const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../../utils/db');

const uploadDir = path.join(__dirname, '../../../uploads');
const tempDir = path.join(uploadDir, 'temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const upload = multer({ dest: tempDir }).single('chunk');

module.exports = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, async (err) => {
            if (err) return reject(err);

            const { chunkIndex, totalChunks, filename } = req.body;
            const chunk = req.file;

            if (!chunk || !chunkIndex || !totalChunks || !filename) {
                res.status(400);
                return resolve({ error: 'Missing chunk data' });
            }

            const finalPath = path.join(uploadDir, `final-${filename}`);

            // Append chunk to final file
            // Note: In a real app, we'd handle concurrency and order more robustly
            // For this demo, we assume sequential chunks or use offsets

            // Simple append approach (works if chunks come in order or we use offsets)
            // Since we can't guarantee order with simple append, we should use writeStream with start/end
            // But for simplicity in this demo, we'll just rename the chunk to a temp part file
            // and merge them when all are present.

            const partPath = path.join(tempDir, `${filename}.part${chunkIndex}`);
            fs.renameSync(chunk.path, partPath);

            // Check if we have all chunks
            // This is a naive check; in production use a tracking DB/Redis
            let receivedChunks = 0;
            for (let i = 0; i < totalChunks; i++) {
                if (fs.existsSync(path.join(tempDir, `${filename}.part${i}`))) {
                    receivedChunks++;
                }
            }

            if (receivedChunks === parseInt(totalChunks)) {
                // Merge chunks
                const writeStream = fs.createWriteStream(finalPath);
                for (let i = 0; i < totalChunks; i++) {
                    const p = path.join(tempDir, `${filename}.part${i}`);
                    const data = fs.readFileSync(p);
                    writeStream.write(data);
                    fs.unlinkSync(p); // Cleanup
                }
                writeStream.end();

                const video = {
                    id: 'vid_' + Date.now(),
                    filename: `final-${filename}`,
                    originalName: filename,
                    path: finalPath,
                    createdAt: new Date().toISOString(),
                    status: 'processed'
                };

                db.videos.create(video);

                return resolve({
                    success: true,
                    videoId: video.id,
                    message: 'Upload complete'
                });
            }

            resolve({ success: true, message: `Chunk ${chunkIndex} received` });
        });
    });
};
