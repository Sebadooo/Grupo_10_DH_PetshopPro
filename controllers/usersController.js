const path = require("path");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {

  //********MUESTRA TODOS LOS USUARIOS REGISTRADOS (ADMIN)********//
  showUsers: (req, res) => {
    db.Users.findAll({
      include: [{ association: "user_cat" }],
    })
      .then(function (users) {
        res.render("users", { users: users });
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  //********MUESTRA EL DETALLE DEL USUARIO SELECCIONADO (ADMIN)********//
  userDetail: (req, res) => {
    db.Users.findByPk(req.params.user_id, {
      include: [{ association: "user_cat" }],
    })
      .then(function (User) {
        res.render("userDetail", { User: User });
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  //********CREAR NUEVO USUARIO (ADMIN)********//
  createUser: (req, res) => {
    db.user_category
      .findAll()
      .then(function (userCat) {
        return res.render("userCreate", { userCat: userCat });
      })
      .catch(function (e) {
        console.log(e);
      });
  },

  //********GUARDAR NUEVO USUARIO CREADO********//
  saveUser: (req, res) => {
    console.log("ESTO ES EL REQ BODY", req.body);
        var valResults = validationResult(req)
        if (!valResults.isEmpty()) {
            res.render("userCreate", {
                errorMsg: valResults.mapped(),
                oldData: req.body,
            })
          }; 
      db.Users.findOne({ where: { email: req.body.email } })
      .then(function(userInDb) {
      if (userInDb) {
        res.render("userCreate", {
          errorMsg: {
              email: {
                  msg: "Este email ya esta registrado",
            },
        },
          oldData: req.body,
      })
  }else{
  db.Users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      user_category_id: 1,
      image: req.file.filename,
  })
      console.log("esto es el body", req.body);
      res.redirect("/users/");
  }
  })
  .catch(function(err){
      console.log(err)
  })
  },
  
  //********EDITAR USUARIO (ADMIN)********//
  editUser: (req, res) => {
    let usuarios = db.Users.findByPk(req.params.user_id);

    let categorias = db.user_category.findAll();

    Promise.all([usuarios, categorias]).then(([user, userCat]) => {
      res.render("userEdit", { user: user, userCat: userCat });
    });
    // db.Users.update({ })
  },

  //********GUARDAR LOS CAMBIOS********//
  updateUser: (req, res) => {
    var valResults = validationResult(req)
        if (!valResults.isEmpty()) {
            res.render("userEdit", {
                errorMsg: valResults.mapped(),
                oldData: req.body,
            })
          };  
      db.Users.findOne({ where: { email: req.body.email } })
      .then(function(userInDb) {
      if (userInDb) {
        res.render("userEdit", {
          errorMsg: {
              email: {
                  msg: "Este email ya esta registrado",
            },
        },
          oldData: req.body,
      })
  }else{
    db.Users.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name ? req.body.last_name : req.body.oldData.last_name,
        email: req.body.email, 
        password: req.body.password,
        user_category_id: req.body.category,
        image: req.body.oldImagen,
      },
      {  
        where: {
          user_id: req.params.user_id,
        },
      }
    );
    res.redirect("/users/");
    }    
  })
},

  //********ELIMINAR UN USUARIO********//
  deleteUser: (req, res) => {
    db.Users.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.redirect("/users");
  },

  //********MOSTRAR FORMULARIO DE REGISTRO********//
  register: (req, res) => {
    res.cookie("Tested", { maxAge: 1000 * 120 });
    res.render("userRegister");
  },

  //********GUARDAR NUEVO USUARIO REGRISTRADO EN DB********//
  saveRegister: (req, res) => {
      var valResults = validationResult(req)
      if (!valResults.isEmpty()) {
          res.render("userRegister", {
              errorMsg: valResults.mapped(),
              oldData: req.body,
          })
        }; 
    db.Users.findOne({ where: { email: req.body.email } })
    .then(function(userInDb) {
    if (userInDb) {
      res.render("userRegister", {
        errorMsg: {
            email: {
                msg: "Este email ya esta registrado",
          },
      },
        oldData: req.body,
    })
}else{
db.Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        user_category_id: 2,
        image: req.file.filename,
})
    console.log("esto es el body", req.body);
    console.log("ARCHIVO .FILE", req.file);
    res.redirect("/userLogin/");
}
})
.catch(function(err){
    console.log(err)
})
},

//********MOSTRAR FORMULARIO DE LOGIN********//
  login: (req, res) => {
    res.render("userLogin");
  },

  //********PRECESAR EL LOGIN********//
  processLogin: (req, res) => {
    if (req.body.email == 0) {
      return res.render("userLogin", {
        errorMsg: {
          email: {
            msg: "Ingrese un email válido",
          },
        },
      });
    }
    //Busca el mail en DB
    db.Users.findOne({ where: { email: req.body.email } })
      .then(function (userToLogin) {
        if (userToLogin) {
            let passOk = bcryptjs.compareSync(
            req.body.password,
            userToLogin.password
          );
          if (passOk) {
            delete userToLogin.password;
            console.log("passOk");
            req.session.userLogged = userToLogin;
            //Guarda en cookies
            if (req.body.remember) {
              res.cookie("userEmail", req.body.email, {
                maxAge: 1000 * 60 * 60 * 60,
              });
            }
            res.redirect("./");
        }
        console.log("ESTO ES LO QUE HAY EN SESSION", req.session);

          res.render("userLogin", {
            errorMsg: {
              pass: {
                msg: "Credenciales invalidas",
              },
            },
          });
        }

        res.render("userLogin", {
          errorMsg: {
            email: {
              msg: "No se encontro el email en la base de datos",
            },
          },
        });
      })

      .catch(function (err) {
        console.log(err);
      });
  },

//********MOSTRAR PERFIL DEL USUARIO LOGUEADO********//
  profileUser: (req, res) => {
    db.Users.findByPk(req.session.userLogged.user_id)
      .then(function (User) {
        res.render("userProfile", { User: User });
      })
      .catch(function (err) {
        console.log(err);
      });
  },

//********CERRAR SESION********//
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    console.log(req.session)
    res.redirect("/");
  },

//********MOSTRAR CARRITO DE COMPRAS********//
  shopCart: (req, res) => {
    res.render("shopCart");
  },
};

module.exports = usersController;
