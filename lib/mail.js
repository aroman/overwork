'use strict';


var path = require('path');
var _ = require('underscore');
var nconf = require('nconf');
var nodemailer = require('nodemailer');

if (process.env.NODE_ENV == 'production') {

}

// This is bad and I should feel bad.
var URL_ROOT = "http://" + (process.env.NODE_ENV == 'production' ? 'getoverwork.com' : 'localhost:8000');

module.exports = {
    _send: function (options, callback) {
        options = _.defaults(options, {
            to: null,
            from: "Overwork <avi@getoverwork.com>",
            subject: null,
            text: null,
            html: null
        });
        var conf = nconf.get('AWSConfig');
        var transport = nodemailer.createTransport("SES", {
            AWSAccessKeyID: conf.AccessKeyID,
            AWSSecretKey: conf.SecretKey,
        });

        transport.sendMail(options, function (err, response) {
            callback && callback(err, response);
        });
    }, 

    sendVerifyEmail: function (user, callback) {
        var body = "Hey <%- name %>,\n\nThanks for signing up for Overwork!\n\nPlease this link to verify your account: <%- link %>\n\Cheers,\nThe Overwork Team";
        this._send({
            to: user.email,
            subject: "Confirm your account",
            text: _.template(body, { name: user.firstname, link: URL_ROOT + "/verify/" + user.verify_token })
        }, callback);
    }
}