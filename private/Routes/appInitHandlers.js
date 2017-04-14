"use strict";
var mongoose = require('mongoose');


module.exports.getAppInit = function (request, reply) {

   return reply(request.session._store);
}

module.exports.setAppInit = function (request, reply) {

    request.session.set('city','BC-PUNE');
    return reply(request.session._store);

}
