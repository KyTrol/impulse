const expect = require('chai').expect;
const config = require('../config.sample.js');

describe('config', function() {

  describe('.get()', function() {

    it('should return development when \'development\' passed in', function() {

      const devConfig = config.get('development');

      expect(devConfig.env).to.equal('development');

    });

    it ('should return production when \'production\' is passed in', function() {

      const prodConfig = config.get('production');

      expect(prodConfig.env).to.equal('production');

    });

    it ('should return development when a nonexistent env identifier is passed in', function() {

      const devConfig = config.get('foobar');

      expect(devConfig.env).to.equal('development');

    });

    it('should return development when nothing is passed in', function() {

      const devConfig = config.get();

      expect(devConfig.env).to.equal('development');

    });

  })

});
