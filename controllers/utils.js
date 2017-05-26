module.exports = {

  sendInternalServerError(res) {

    res.status(500);
    res.send({ errorMessage: 'Internal server error.' });

  },

  sendBadRequest(res, message) {

    res.status(400);
    res.send({ errorMessage: message });

  }

};
