/**
 * Module that will handle our authentication tasks
 */
'use strict';

var User = require('../models/user'),
    LocalStrategy = require('passport-local').Strategy;

exports.config = function (settings) {

};

/**
 * A helper method to retrieve a user from a local DB and ensure that the provided password matches.
 * @param req
 * @param res
 * @param next
 */
exports.localStrategy = function () {

    return new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {

        //Retrieve the user from the database by login
        User.findOne({email: email}, function (err, user) {

            //If something weird happens, abort.
            if (err) {
                return done(err);
            }

            //If we couldn't find a matching user, flash a message explaining what happened
            if (!user) {
                return done(null, false, { message: 'Login not found' });
            }

            //Make sure that the provided password matches what's in the DB.
            if (!user.passwordMatches(password)) {
                return done(null, false, { message: 'Incorrect Password' });
            }

            //If everything passes, return the retrieved user object.
            done(null, user);

        });
    });
};

/**
 * A helper method to determine if a user has been authenticated, and if they have the right role.
 * If the user is not known, redirect to the login page. If the role doesn't match, show a 403 page.
 * @param role The role that a user should have to pass authentication.
 */
exports.isAuthenticated = function () {

    return function (req, res, next) {

        if (!req.isAuthenticated()) {

            //If the user is not authorized, save the location that was being accessed so we can redirect afterwards.
            req.session.whence = req.url;
            res.redirect('/login');
            return;
        }

        next();
    };
};

/**
 * A helper method to add the user to the response context so we don't have to manually do it.
 * @param req
 * @param res
 * @param next
 */
exports.injectUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};
