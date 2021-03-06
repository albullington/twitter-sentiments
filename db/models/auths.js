const db = require('../');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const Auth = db.Model.extend({
  tableName: 'auths',
  profile() {
    return this.belongsTo('Profile');
  },

  initialize() {
    this.on('saving', (user, attrs, options) => {
      if (user.get('type') === 'local') {
        return this.generatePassword(user.get('password'))
          .then((hash) => {
            this.set('password', hash);
          })
          .error((err) => {
            throw err;
          });
      }
    });
  },

  comparePassword(attempted) {
    return bcrypt.compareAsync(attempted, this.get('password'));
  },

  generatePassword(password) {
    return bcrypt.genSaltAsync(null)
      .then((salt) => {
        this.set('salt', salt);
        return bcrypt.hashAsync(password, salt, null);
      });
  },
});

module.exports = db.model('Auth', Auth);
