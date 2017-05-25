module.exports = {

  sendInternalServerError: function (res) {

    res.status(500);
    res.send({ errorMessage: 'Internal server error.' });

  },

  sendBadRequest: function (res, message) {

    res.status(400);
    res.send({ errorMessage: message });

  }

};
