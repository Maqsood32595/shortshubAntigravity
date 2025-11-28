
// Auto-generated routes for Video Upload
// Source: features/video-upload.yaml

const express = require('express');
const router = express.Router();
// const featureGuard = require('../../.feature-system/runtime/feature-guard');
// const authMiddleware = require('../middleware/auth');
// const rateLimit = require('../middleware/rate-limit');


router.post('/api/upload/video',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/upload.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

router.get('/api/video/list',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/list.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

router.get('/api/video/user-list',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/user-list.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

router.get('/api/videos/trending',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/feed.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

router.get('/api/videos/featured',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/feed.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

router.get('/api/videos/subscriptions',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/feed.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

router.get('/api/user/history',
  // featureGuard.middleware('video-upload'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/feed.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('video-upload');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('video-upload', error);
      next(error);
    }
  }
);

module.exports = router;
