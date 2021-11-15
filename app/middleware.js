var connection = require('../app/db-ops.js').connection;

module.exports = {
    isUserAuthenticated(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    },
    isAdminUser(req, res, next) {
        connection.query("SELECT flag FROM mucsc_users WHERE google_id=?", [req.user.id], function(err, rows){
            if (rows.flag == 1) {
                next();
            } else if (err){
                res.redirect('/error');
            }
        });
    } 
}