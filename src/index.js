const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');
const {deleteAd, updateAd} = require('./database/ads');
const UsersController = require("./users/controllers/users.controllers");

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {
  res.send(await getAds());
});

app.post('/', async (req, res) => {
  const newAd = req.body;
  await insertAd(newAd);
  res.send({ message: 'New ad inserted.' });
});

// endpoint to delete an ad
app.delete('/:id', async (req, res) => {
  await deleteAd(req.params.id);
  res.send({ message: 'Ad removed.' });
});

// endpoint to update an ad
app.put('/:id', async (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ message: 'Ad updated.' });
});

app.post('/users', [
  UsersController.insert
]);

app.get('/users/:userId', [
  UsersController.getById
]);

startDatabase().then(async () => {
  await insertAd({title: 'Hello, now from the in-memory database!'});

  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
