require.config({
  baseUrl: "./js/app",
  paths: {
    "jquery"          : "../libs/jquery-1.10.2.min",
    "underscore"      : "../libs/lodash",
    "backbone"        : "../libs/backbone",
    "restApiServer"   : "../app/config/restApiServer",
    "jasminejquery"   : "../libs/plugins/jasmine-jquery",
    "text"            : "../libs/plugins/text",
    "slider"          : "../libs/plugins/slider",
    "jqueryCookie"    : "../libs/plugins/jquery.cookie",
    "viewport"        : "../libs/plugins/jquery.viewport.mini",
    "bxslider"       : "../libs/plugins/jquery.bxslider",
  },

  shim: {
    "backbone": {
      "deps": ["underscore", "jquery"],
      "exports": "Backbone"
    },

    "jasminejquery": ["jquery"],

    "slider": ["jquery"],

    "jqueryCookie": ["jquery"],

    "viewport": ["jquery"],

    "bxslider": ["jquery"]
  }

});
