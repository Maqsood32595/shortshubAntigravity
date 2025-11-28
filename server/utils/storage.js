const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const uploadFile = (file, destination) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file uploaded');
        }

        const blob = bucket.file(destination);
        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Or authenticated URL (signed URL) - for now we assume public access or just storing path
            const gcsUri = `gs://${bucket.name}/${blob.name}`;

            resolve({
                filename: blob.name,
                path: gcsUri,
                bucket: bucket.name
            });
        });

        blobStream.end(file.buffer);
    });
};

// Generate signed URL for secure access to GCS files
const getSignedUrl = async (gcsPath) => {
    try {
        // Extract file path from gs://bucket/path format
        if (!gcsPath || !gcsPath.startsWith('gs://')) {
            throw new Error('Invalid GCS path');
        }

        const pathParts = gcsPath.replace('gs://', '').split('/');
        const bucket = pathParts.shift();
        const filePath = pathParts.join('/');

        const file = storage.bucket(bucket).file(filePath);

        // Generate signed URL valid for 1 hour
        const [url] = await file.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000 // 1 hour
        });

        return url;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw error;
    }
};

module.exports = {
    uploadFile,
    getSignedUrl
};
