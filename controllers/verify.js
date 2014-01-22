'use strict';

var _ = require('underscore');
var mail = require('../lib/mail');
var User = require('../models/user');

module.exports = function (app) {

    app.get('/verify/:token', function (req, res) {
        User.update({ verify_token: req.params.token }, { is_verified: true }, function (err) {
            if (err) {
                res.send(500);
            } else {
                res.redirect("/");
            }
        });
    });

}