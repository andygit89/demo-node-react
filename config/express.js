import express from 'express';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import helmet from 'helmet';
import routes from '../server/routes/index.route';
import * as config from './env';
import webpack from 'webpack';
import path from 'path';
import webPackconfig from '../webpack.config.dev';
const compiler = webpack(webPackconfig);

const app = express();

if (config.ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorHandler());
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webPackconfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

//app.use(express.static(path.join(__dirname, '/src/')));

app.use('/api', routes);
// mount all routes on /api path
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '.././src/index.html'));
});

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  return next(err);
});




export default app;
