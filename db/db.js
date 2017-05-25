const mongoose = require('mongoose');
const config = require('../config').get(process.env.NODE_ENV);

let connection = null;

exports.get = function () {

  if (!connection) {

    mongoose.Promise = global.Promise;

    connection = mongoose.createConnection(config.mongodb.host);

    connection.on('error', console.error.bind('Database connection failed'));
    connection.once('open', console.log.bind('Database connection successfull'));

  }

  return connection;

};
