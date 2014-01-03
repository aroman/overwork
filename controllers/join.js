'use strict';


module.exports = function (app) {

    app.get('/join', function (req, res) {

        res.format({
            json: function () {
                res.json("not implemented");
            },
            html: function () {
                res.render('join');
            }
        });
    });

};
