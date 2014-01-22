'use strict';


module.exports = function (server) {

    server.get('/settings', function (req, res) {
        res.render('settings');

    });

};
