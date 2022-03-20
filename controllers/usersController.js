const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const multer = require("multer");

const usersController = {
  //MUESTRA TODOS LOS USUARIOS REGISTRADOS//
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
  //MUESTRA EL DETALLE DEL USUARIO SELECCIONADO//
  userDetail: (req, res) => {
    db.Users.findByPk(req.params.id, {
      include: [{ association: "user_cat" }],
    })
      .then(function (User) {
        res.render("userDetail", { User:User });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  //CREAR NUEVO USUARIO (ADMIN)//
  createUser: (req, res) => {
    db.user_category.findAll()
        .then(function (userCat) {
          return res.render("userCreate", {userCat:userCat});
        })
        .catch(function (e) {
          console.log(e);
        });
  },
  //GUARDADO DEL NUEVO USUARIO CREADO//
  saveUser: (req, res) => {
    db.Users.create({
      firt_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      user_category_id: req.body.category,
      image: req.body.avatar,
    });
    res.redirect("/");
  },
  //EDITAR USUARIO//
  editUser: (req, res) => {
      let idUser = req.params.idUser;
    res.send(idUser);
     // db.Users.update({ })
   },
  //GUARDAR LOS CAMBIOS//
  // update: (req, res) => {
  //},
  //ELIMINA UN USUAIO

  //MUESTRA EL FORMULARIO DE REGISTRO//
  register: (req, res) => {
    res.cookie("Tested", { maxAge: 1000 * 120 });
    res.render("userRegister");
  },
  //GUARDA AL NUEVO USUARIO REGRISTRADO EN LA BASE DE DATOS//
  saveRegister: (req, res) => {
    //   let valResults = validationResult(req.body)
    //   console.log("esto es el save body del saveRegister", req.body)
    //      if(valResults.errors.length > 0) {
    //        return res.render('userRegister'),{
    //          errors: valResults.mapped(),
    //          oldData: req.body
    //        }
    //      }
    //    let usuarioExistente = User.findByField ("email")

    //    if (usuarioExistente == req.body.email) {
    //          return res.render('userRegister', {
    //              errors: {
    //                  email: {
    //                      msg: "Este usuario ya existe"
    //                  }
    //              },
    //              old: req.body
    //          })
    //      };

    let usuarioNuevo = {
      ...req.body,
      //password: bcryptjs.hashSync(req.body.password, 10),
      //avatar: reqbody..file.fileName
    };
    console.log("usuario nuevo", usuarioNuevo);
    let usuarioCreado = Users.create(usuarioNuevo);
    console.log("usuario nuevo", usuarioCreado);

    res.redirect("./views/userLogin.ejs");
  },

  //MUESTRA EL FORMULARIO DE LOGIN O INICIAR SESION//
  login: (req, res) => {
    res.render("userLogin");
  },
  //PRECESA EL LOGIN//
  processLogin: (req, res) => {
    //Manejo de cookies
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 24;
      res.cookie("amarillo", "Bienvenido usuario!");
    } else {
      req.session.cookie.expires = false;
    }
    db.Users.findOne({ where: { email: req.body.email } })
      .then((Users) => {
        if (Users && bcryptjs.compareSync(req.body.password, User.password)) {
          delete User.password;
          console.log("users", Users);
          req.session.userLogged = Users;
          console.log("logged", req.session.userLogged);
          res.redirect("/", { Users: Users });
        } else {
          res.render("userLogin");
        }
      })
      .catch((e) => console.log(e));
  },
  /*processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync('usersDataBase.json',{usersDataPath:'utf-8'});
            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            for (let i = 0; i < user.length; i++) {
                if (users[i].email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, users[i].password))
                    var usuarioALoguearse = users[i];
                    break;
                }
            }
        }
        if (usuarioALoguearse == undefined) {
            return res.render ('userLogin', {errors: [
                {msg: "Credenciales invalidas"}
                ]});
            }

            req.session.usuarioLogueado = usuarioALoguearse;
            res.redirect ("Login exitoso!");
        } else {
            return res.render ('userLogin', {errors: errors.errors})
        }*/
  // CERRANDO SESION//
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("email", null, { maxAge: -1 });
    res.redirect("/");
  },

  // CARRITO DE COMPRAS //
  shopCart: (req, res) => {
    res.render("shopCart");
  },
};

module.exports = usersController;
