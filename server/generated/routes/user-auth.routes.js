
// Auto-generated routes for User Authentication
// Source: features/user-auth.yaml

const express = require('express');
const router = express.Router();
// const featureGuard = require('../../.feature-system/runtime/feature-guard');
// const authMiddleware = require('../middleware/auth');
// const rateLimit = require('../middleware/rate-limit');


router.post('/api/auth/register',
  // featureGuard.middleware('user-auth'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/auth/register.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('user-auth');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('user-auth', error);
      next(error);
    }
  }
);

router.post('/api/auth/login',
  // featureGuard.middleware('user-auth'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/auth/login.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('user-auth');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('user-auth', error);
      next(error);
    }
  }
);

router.get('/api/auth/me',
  // featureGuard.middleware('user-auth'),
  // 
  // 
  async (req, res, next) => {
    try {
      const handler = require('../../custom/auth/me.js');
      const result = await handler(req, res);
      // await featureGuard.recordSuccess('user-auth');
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      // await featureGuard.recordFailure('user-auth', error);
      next(error);
    }
  }
);

module.exports = router;
