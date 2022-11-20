import User from '../../users/models/users.model.js';
import crypto from 'crypto';

const hasAuthValidFields = (req, res, next) => {
  let errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push('Missing email field');
    }
    if (!req.body.password) {
      errors.push('Missing password field');
    }

    if (errors.length) {
      return res.status(400).send({errors: errors.join(',')});
    } else {
      return next();
    }
  } else {
    return res.status(400).send({errors: 'Missing email and password fields'});
  }
};

const isPasswordAndUserMatch = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email})
  try {
    const passwordFields = user.password.split('$');
    const salt = passwordFields[0];
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    if (hash === passwordFields[1]) {
      req.body = {
        userId: user._id,
        email: user.email,
        permissionLevel: user.permissionLevel,
        provider: 'email',
        name: user.firstName + ' ' + user.lastName,
      };
      return next();
    } else {
      return res.status(400).send({errors: ['Invalid e-mail or password']});
    }
  } catch (error) {
    res.status(404).send({message: 'User doesn\'t exist'});
  };
};

export {
  hasAuthValidFields,
  isPasswordAndUserMatch
}
