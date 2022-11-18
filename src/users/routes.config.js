const express = require("express");
const UsersController = require("./controllers/users.controllers");
const app = express();

app.post('/users', [
  UsersController.insert
]);
