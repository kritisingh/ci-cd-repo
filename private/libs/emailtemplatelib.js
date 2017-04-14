var fs 		    = require('fs');
var _ 		    = require('underscore');
module.exports.generateEmailTemplate = function (recv,subject,description,propertydata,templateFile,callback) {
				var sendmail = require('./sendmaillib');
				var htmldata = fs.readFileSync(templateFile, 'utf8');
				htmldata.toString();
				var compiled = _.template(htmldata);
				var finalData = compiled(propertydata);
				sendmail.sendMail(recv,subject,description,finalData);
				callback(null,"sent email");
}






