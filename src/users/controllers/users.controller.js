import expressAsyncHandler from 'express-async-handler';
import User from '../models/users.model.js';
import crypto from 'crypto';

const insert = expressAsyncHandler(async (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = req.body.permissionLevel || 1;

  const {firstName, lastName, email, password, permissionLevel} = req.body;

  const userExists = await User.findOne({email});

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    permissionLevel,
  })

  if (user) {
    res.status(201).json({message:'User created successfully'});
  } else {
    res.status(400);
    throw new Error('Invalid user Data');
  }


});

const list = expressAsyncHandler(async (req, res) => {
  const pagesize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.count();
  const users = await User.find()
    .limit(pagesize)
    .skip(pagesize * (page - 1));

  res.json({users, page, pages: Math.ceil(count / pagesize)});
});

const getById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateById = expressAsyncHandler(async (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
  }

  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.permissionLevel = req.body.permissionLevel || user.permissionLevel;

    const updatedUser = await user.save();

    res.json({message: 'User updated succesfully',
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const removeById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({message: 'User removed'});
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  updateById,
  removeById,
  list,
  getById,
  insert
}
