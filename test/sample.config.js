var config = require('../config.sample.js');
var should = require('chai').should();

describe('Testing config.js', function() {

  describe('#get()', function() {

    it('should return development when \'development\' passed in', function() {

      const devConfig = config.get('development');

      devConfig.should.not.be.equal(undefined);
      devConfig.should.have.property('env');
      devConfig.env.should.be.equal('development');

    });

    it ('should return production when \'production\' is passed in', function() {

      const prodConfig = config.get('foobar');

      prodConfig.should.not.be.equal(undefined);
      prodConfig.should.have.property('env');
      prodConfig.env.should.be.equal('development');

    });

    it ('should return development when a nonexistent env identifier is passed in', function() {

      const devConfig = config.get('foobar');

      devConfig.should.not.be.equal(undefined);
      devConfig.should.have.property('env');
      devConfig.env.should.be.equal('development');

    });

    it('should return development when nothing is passed in', function() {

      const devConfig = config.get();

      devConfig.should.not.be.equal(undefined);
      devConfig.should.have.property('env');
      devConfig.env.should.be.equal('development');

    });

  })

});
