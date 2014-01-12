'use strict';

var _ = require('underscore');
var path = require('path');
var validator = require('validator');
var User = require('../models/user');

module.exports = function (app) {

    app.get('/join', function (req, res) {

        var values = req.flash('values')[0];
        var errors = req.flash('errors')[0];
        res.render('join', { values: values, errors: errors, navbar: 0 });

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
            errors.firstname = "Letters only.";
        }
        else if (!validator.isLength(req.body.lastname, 1, 20)) {
            errors.lastname = "1-20 characters";
        }
        else if (!validator.isAlpha(req.body.lastname)) {
            errors.lastname = "Letters only.";
        }
        
        req.body.email = validator.toString(validator.trim(validator.escape(req.body.email)));
        req.body.firstname = validator.blacklist(validator.toString(validator.trim(validator.escape(req.body.firstname))), " ");
        req.body.lastname = validator.blacklist(validator.toString(validator.trim(validator.escape(req.body.lastname))), " ");

        if (_.isEmpty(errors)) {
            var user = User(_.pick(req.body, ['email', 'password', 'firstname', 'lastname']));
            User.findOne({"email": req.body.email }, function (err, doc) {
                console.log(doc);
                if (err) {
                    res.status(500);
                } else {
                    console.log(doc);
                    if (doc) {
                        user.save(function (save_err) {
                            save_err = "Something went wrong (this message is hard-coded and always shows)";
                            if (save_err) {
                                // XXX: In production, we shouldn't directly echo mongo errors to the client
                                errors.misc = save_err;
                                return tryAgain();
                            } else {
                                return res.redirect('/');
                            }
                        });
                    } else {
                        errors.email = "Email is taken.";
                        return tryAgain();
                    }
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
