const config = require('../config.sample.js');
const should = require('chai').should();

describe('Testing config.js', () => {

  describe('#get()', () => {

    it('should return development when "development" passed in', () => {

      const devConfig = config.get('development');

      devConfig.should.not.be.equal(undefined);
      devConfig.should.have.property('env');
      devConfig.env.should.be.equal('development');

    });

    it('should return production when "production" is passed in', () => {

      const prodConfig = config.get('foobar');

      prodConfig.should.not.be.equal(undefined);
      prodConfig.should.have.property('env');
      prodConfig.env.should.be.equal('development');

    });

    it('should return development when a nonexistent env identifier is passed in', () => {

      const devConfig = config.get('foobar');

      devConfig.should.not.be.equal(undefined);
      devConfig.should.have.property('env');
      devConfig.env.should.be.equal('development');

    });

    it('should return development when nothing is passed in', () => {

      const devConfig = config.get();

      devConfig.should.not.be.equal(undefined);
      devConfig.should.have.property('env');
      devConfig.env.should.be.equal('development');

    });

  });

});
