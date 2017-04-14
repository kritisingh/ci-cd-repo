/**
 * Environment dependent configuration properties
 */
module.exports = {
    DEV: {
      root: '/home/admin/mycitykart-app',
      app: {
        name: 'mycitykart-app'
      },
      host:   'localhost',
      port:   '8080',
      db_url: 'mongodb://localhost:27017/MYCITYKART-PRODUCTION',
      redis_url: null,
      session_timeout: 20 * 60 * 10, // defaults to 20 minutes, in ms (20 * 60 * 1000)
      socket_loglevel: '1',          // 0 - error, 1 - warn, 2 - info, 3 - debug
      mailSettings : {
          mailFrom: 'sales@bctech.in',
          mailService: "Gmail",
          mailAuth: {user: "sales@bctech.in", pass: "BCT2014m#"},
          sendEmail: false,
          browserPreview: true
      },
      version: '1.0.0'
    },
    TEST: {
      root: '/home/admin/mycitykart-app',
      app: {
        name: 'mycitykart-app'
      },
      host:   'localhost',
      port:   '8001',
      db_url: 'mongodb://localhost:27017/MYCITYKART-PRODUCTION',
      redis_url: null,
      session_timeout: 20 * 60 * 10, // defaults to 20 minutes, in ms (20 * 60 * 1000)
      socket_loglevel: '1',          // 0 - error, 1 - warn, 2 - info, 3 - debug
      mailSettings : {
          mailFrom: 'sales@bctech.in',
          mailService: "Gmail",
          mailAuth: {user: "sales@bctech.in", pass: "BCT2014m#"},
          sendEmail: false,
          browserPreview: true
      },
      version: '1.0.0'
    },
    PROD: {
      root: '/home/admin/mycitykart-app',
      app: {
        name: 'mycitykart-app'
      },
      host:   '127.0.0.1',
      port:   '80',
      db_url: 'mongodb://apps:tm120rtymgk@165.225.144.54:27017/ORGADLITE-TEST',
      redis_url: null,
      session_timeout: 20 * 60 * 10, // defaults to 20 minutes, in ms (20 * 60 * 1000)
      socket_loglevel: '1',          // 0 - error, 1 - warn, 2 - info, 3 - debug
      mailSettings : {
          mailFrom: 'sales@bctech.in',
          mailService: "Gmail",
          mailAuth: {user: "sales@bctech.in", pass: "BCT2014m#"},
          sendEmail: false,
          browserPreview: true
      },
      version: '1.0.0'
    }
}
