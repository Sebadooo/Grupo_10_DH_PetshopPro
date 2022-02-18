function guestMiddleware (req, res, next) {
if (req.session.usuarioLogueado == undefined) {
    next();
} else {
    res.send ("Solo personal autorizado...");
    }
};


module.exports = guestMiddleware;