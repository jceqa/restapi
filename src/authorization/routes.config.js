import {
  hasAuthValidFields,
  isPasswordAndUserMatch
} from './middlewares/verify.user.middleware.js';
import {
  login,
} from './controllers/authorization.controller.js';
import {
  verifyRefreshBodyField,
  validJWTNeeded,
  validRefreshNeeded
} from '../common/middlewares/auth.validation.middleware.js';

const authRoutes = function (app) {

  app.post('/auth', [
    hasAuthValidFields,
    isPasswordAndUserMatch,
    login
  ]);

  app.post('/auth/refresh', [
    validJWTNeeded,
    verifyRefreshBodyField,
    validRefreshNeeded,
    login
  ]);
};

export default authRoutes;
