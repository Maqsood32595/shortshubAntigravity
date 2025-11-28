const path = require('path');
const envPath = path.join(__dirname, '../.env');
const result = require('dotenv').config({ path: envPath });
console.log('Loading .env from:', envPath);
console.log('Dotenv result:', result.error ? result.error.message : 'Success');
console.log('PORT:', process.env.PORT);
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Initialize Database
require('./utils/db');

// Load generated routes
const generatedRoutesDir = path.join(__dirname, 'generated', 'routes');
if (fs.existsSync(generatedRoutesDir)) {
    fs.readdirSync(generatedRoutesDir).forEach(file => {
        if (file.endsWith('.routes.js')) {
            const router = require(path.join(generatedRoutesDir, file));
            app.use('/', router);
            console.log(`Loaded routes from ${file}`);
        }
    });
}

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve static files from the React app
// Serve static files from the React app
const clientBuildPath = path.join(__dirname, '../client/build');
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../client/build/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Client build not found. If in development, use port 3002.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
