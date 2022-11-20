import config from '../config/env.config.js';

const minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.jwt.permissionLevel);
    if (user_permission_level && required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};

const onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  let user_permission_level = parseInt(req.jwt.permissionLevel);
  let userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level && config.permissionLevels.ADMIN) {
      return next();
    } else {
      return res.status(403).send();
    }
  }

};

const sameUserCantDoThisAction = (req, res, next) => {
  let userId = req.jwt.userId;
  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }
};

export {
  minimumPermissionLevelRequired,
  onlySameUserOrAdminCanDoThisAction,
  sameUserCantDoThisAction
}
