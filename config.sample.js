const config = {


  development: {

    mongodb: {
      "host": "mongodb://localhost:27017/impulse",
      "username": "",
      "password": ""
    },

    session: {
      secret: "super secret session secret",
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
    }


  }


};

exports.get = function get(env) {
  return config[env] || config.development;
};
