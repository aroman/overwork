'use strict';


module.exports = function (app) {

    app.get('/join', function (req, res) {

        res.render('join');
    });

    app.post('/join', function (req, res) {

        console.log(req.body);

        res.format({
            json: function () {
                res.json('not implemented');
            },
            html: function () {
                res.render('join');
            }
        });
    });


};
