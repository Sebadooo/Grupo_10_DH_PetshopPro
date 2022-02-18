function authMiddleware (req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        next();
    } else {
        res.send ("Solo para usuarios registrados");
        }
    };
    
    
    module.exports = authMiddleware;