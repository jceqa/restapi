import config from './common/config/env.config.js';
import express from 'express';
import { notFound, errorHandler } from './common/middlewares/errorMiddleware.js';
import AuthorizationRouter from './authorization/routes.config.js';
import UsersRouter from './users/routes.config.js';
import swaggerUI from 'swagger-ui-express';
import basicInfo from './docs/basicInfo.js';

const app = express();


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});



app.use(express.json());
app.use('/apiDocs',swaggerUI.serve,swaggerUI.setup(basicInfo));

AuthorizationRouter(app);
UsersRouter(app);

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log('app listening at port %s', config.port);
});
