import mongoose from 'mongoose';
import * as config from './config/env';
import app from './config/express';
import Promise from 'bluebird';
import Debug from 'debug';
const debug = Debug("index");


// promisify mongoose
Promise.promisifyAll(mongoose);


// connect to mongo db
mongoose.connect('mongodb://localhost/demodb', { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.DB}`);
});
// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug',true);

}

  // listen on port config.port
  app.listen(config.PORT, () => {
    debug(`server started on port ${config.PORT} (${config.ENV})`);
  });


export default app;
