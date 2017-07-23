var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'attendance'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://127.0.0.1/HackerEarth'
  },

  test: {
    root: rootPath,
    app: {
      name: 'attendance'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/HackerEarth'
  },

  production: {
    root: rootPath,
    app: {
      name: 'attendance'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/HackerEarth'
  }
};

module.exports = config[env];