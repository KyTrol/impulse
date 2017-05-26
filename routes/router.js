module.exports = (passport) => {

  return {
    api: require('./api/api.route')(passport),
    client: require('./client/index.route')
  };

};
