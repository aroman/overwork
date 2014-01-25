'use strict';

var _ = require('underscore');
var validator = require('validator');
var mail = require('../lib/mail');
var User = require('../models/user');
var passport = require('passport');

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
            errors.firstname = "2-20 characters";
        }
        else if (!validator.isAlpha(req.body.firstname)) {
            errors.firstname = "Letters only";
        }
        else if (!validator.isLength(req.body.lastname, 1, 20)) {
            errors.lastname = "1-20 characters";
        }
        else if (!validator.isAlpha(req.body.lastname)) {
            errors.lastname = "Letters only";
        }

        if (_.isEmpty(errors)) {
            var user = User(_.pick(req.body, ['email', 'password', 'firstname', 'lastname']));
            user.save(function (err) {
                if (err) {
                    if (err.code === 11000) { // 11000 is duplicate key error
                        errors.email = "Already in use";
                    } else { // We have an error, but it's not a duplicate key error
                        errors.misc = err;
                    }
                    return tryAgain();
                } else {
                    mail.sendVerifyEmail(user);
                    passport.authenticate('local', { successRedirect: '/' })(req, res);
                }
            });
        } else {
            return tryAgain();
        }

        var tryAgain = function () {
            req.flash('values', _.omit(req.body, ['password', 'verify']));
            req.flash('errors', errors);
            return res.redirect('/join');
        };
    });

};
