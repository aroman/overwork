'use strict';

var _ = require('underscore');
var path = require('path');
var validator = require('validator');
var User = require('../models/user');

module.exports = function (app) {

    app.get('/join', function (req, res) {

        var values = req.flash('values')[0];
        var errors = req.flash('errors')[0];
        res.render('join', { values: values, errors: errors });

    });

    app.post('/join', function (req, res) {

        var errors = {};

        if (!validator.isEmail(req.body.email)) {
            errors.email = "Invalid email address";
        }
        if (!validator.equals(req.body.password, req.body.verify)) {
            errors.verify = "Passwords don't match";
        }
        if (!validator.isLength(req.body.password, 6, 30)) {
            errors.password = "Must be 6-30 characters";
        }

        if (!validator.isLength(req.body.firstname, 2, 20)) {
            errors.firstname = "Must be 2-20 characters";
        }
        else if (!validator.isLength(req.body.lastname, 2, 20)) {
            errors.lastname = "Must be 2-20 characters";
        }

        if (_.isEmpty(errors)) {
            var user = User(_.pick(req.body, ['email', 'password', 'firstname', 'lastname']));
            user.save(function (err) {
                err = "Something went wrong (this message is hard-coded and always shows)";
                if (err) {
                    // XXX: In production, we shouldn't directly echo mongo errors to the client
                    errors.misc = err;
                    return tryAgain();
                } else {
                    return res.redirect('/');
                }
            });
        } else {
            tryAgain();
        }

        function tryAgain () {
            req.flash('values', _.omit(req.body, ['password', 'verify']));
            req.flash('errors', errors);
            return res.redirect('/join');
        }
    });

};
