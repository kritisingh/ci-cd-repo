var nodemailer = require("nodemailer");
var env     = process.env.NODE_ENV || 'TEST';
var config  = require('../Configs/config')[env];
// create reusable transport method (opens pool of SMTP connections)
// mailSettings 



module.exports.sendMail = function (recv,sub,txt,templ) { 

console.log(sub+""+txt+""+templ);

var receiver = recv;
var subject = sub;
var text = txt;
var template = templ;

var smtpTransport = nodemailer.createTransport("SMTP",{
    service:  config.mailSettings.mailService,
    auth: config.mailSettings.mailAuth
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: config.mailSettings.mailFrom, // sender address
    to: receiver, // list of receivers
    subject: subject, // Subject line
    text: text, // plaintext body
    html: template // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
 //   smtpTransport.close(); // shut down the connection pool, no more messages
});
}
