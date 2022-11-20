import {
  getById,
  list,
  removeById,
  insert,
  updateById
} from './controllers/users.controller.js';
import {
  onlySameUserOrAdminCanDoThisAction,
  minimumPermissionLevelRequired,
} from '../common/middlewares/auth.permission.middleware.js';
import { validJWTNeeded } from '../common/middlewares/auth.validation.middleware.js';
import config from '../common/config/env.config.js';

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

const userRoutes = function (app) {
  app.post('/users', [
    insert
  ]);
  app.get('/users', [
    validJWTNeeded,
    minimumPermissionLevelRequired(PAID),
    list
  ]);
  app.get('/users/:id', [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    onlySameUserOrAdminCanDoThisAction,
    getById
  ]);
  app.put('/users/:id', [
    validJWTNeeded,
    minimumPermissionLevelRequired(FREE),
    onlySameUserOrAdminCanDoThisAction,
    updateById
  ]);
  app.delete('/users/:id', [
    validJWTNeeded,
    minimumPermissionLevelRequired(ADMIN),
    removeById
  ]);
};

export default userRoutes;
