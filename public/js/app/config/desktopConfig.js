require.config({

  baseUrl: "../js/app",

  paths: {

      // Core Libraries

      "jquery": "../libs/jquery-1.10.2.min",

      "underscore": "../libs/lodash",

      "backbone": "../libs/backbone",

      "restApiServer": "../app/config/restApiServer",

      // Plugins

      "backbone.validateAll": "../libs/plugins/Backbone.validateAll",

      "bootstrap": "../libs/plugins/bootstrap",

      "text": "../libs/plugins/text",

      "jasminejquery": "../libs/plugins/jasmine-jquery",

      "slider": "../libs/plugins/slider",

      "jqueryui": "../libs/jqueryui",

      "hoverIntent": "../libs/plugins/hoverIntent",
      
      "viewport": "../libs/plugins/jquery.viewport.mini",

      "jcarousel": "../libs/plugins/jquery_jcarousel_min",

      "jqueryCookie": "../libs/plugins/jquery.cookie"
  },

  shim: {

      "bootstrap": ["jquery"],

      "backbone": {

        "deps": ["underscore", "jquery"],

        "exports": "Backbone"

      },

      "backbone.validateAll": ["backbone"],

      "jasminejquery": ["jquery"],

      "slider": ["jquery"],

      "jcarousel": ["jquery"],

      "hoverIntent": ["jquery", "jqueryui"],
    
      "viewport": ["jquery"],

      "jqueryCookie": ["jquery"]
  }

});
