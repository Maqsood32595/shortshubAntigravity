
// Auto-generated routes for User Dashboard
// Source: features/dashboard.yaml

const express = require('express');
const router = express.Router();
// const featureGuard = require('../../.feature-system/runtime/feature-guard');
// const authMiddleware = require('../middleware/auth');
// const rateLimit = require('../middleware/rate-limit');


router.get('/api/dashboard/stats',
  // featureGuard.middleware('dashboard'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/dashboard/stats.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('dashboard');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('dashboard', error);
      next(error);
    }
  }
);

router.get('/api/activity/feed',
  // featureGuard.middleware('dashboard'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/activity/feed.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('dashboard');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('dashboard', error);
      next(error);
    }
  }
);

router.get('/api/videos/recent',
  // featureGuard.middleware('dashboard'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/video/recent.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('dashboard');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('dashboard', error);
      next(error);
    }
  }
);

router.get('/api/upload/history',
  // featureGuard.middleware('dashboard'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/upload/history.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('dashboard');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('dashboard', error);
      next(error);
    }
  }
);

module.exports = router;
