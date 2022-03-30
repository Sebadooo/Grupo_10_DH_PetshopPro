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
    db.Users.findByPk(req.params.user_id, {
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
    console.log("ESTO ES EL REQ BODY", req.body)
    db.Users.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      //user_category_id: 1,
      image: req.body.avatar,
    })
    res.redirect("/"),{msg: "Usuario creado con éxito!"};
  },
  //EDITAR USUARIO//
  editUser: (req, res) => {
      let usuarios = db.Users.findByPk(req.params.user_id);
      
      let categorias = db.user_category.findAll();

      Promise.all([usuarios, categorias])
      .then(([userToEdit, category])=> {
          res.render('userEdit', {userToEdit:userToEdit, category:category});
      })
      // db.Users.update({ })
   },
  //GUARDAR LOS CAMBIOS//
  updateUser: (req, res) => {
    db.Users.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        user_category_id: req.body.category,
        image: "/publics/images/avatars" + req.file.filename,
      },{
          where: {
              id: req.params.user_id
          }
        });
      res.redirect("/userDetail/"+ req.params.user_id);
  },
  //ELIMINA UN USUARIO//
  deleteUser: (req, res) => {
      db.Users.destroy({
          where: {
              user_id: req.params.user_id
          } 
      })
        res.redirect("/users");
  },
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
    //    let usuarioExistente = db.Users.findByField ("email")

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

    db.Users.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        user_category_id: 2,
        image: "/publics/images/avatars" + req.file.filename,
      })
      console.log("esto es el body", req.body)
      res.redirect("userLogin")
    
      .catch((err) => {
        console.log(err)
      })      
    },

  //MUESTRA EL FORMULARIO DE LOGIN O INICIAR SESION//
  login: (req, res) => {
    res.render("userLogin");
  },
  //PRECESA EL LOGIN//
  processLogin: (req, res) => {
    //Manejo de cookies
    // if (req.body.remember) {
    //   req.session.cookie.maxAge = 1000 * 60 * 24;
    //   res.cookie("amarillo", "Bienvenido usuario!");
    // } else {
    //   req.session.cookie.expires = false;
    // }
    db.Users.findOne({ where: { email: req.body.email } })
     //let userInDb = db.Users for(let i = 0 ; i < db.Users.length ; i++); 
    .then((User) => {
        if (User.email == req.body.email && bcryptjs.compareSync(req.body.password == User.password)) {
          console.log("users", User);
          console.log("logged", req.session.userLogged);
          res.redirect("/", { Users: User });
        } else {
          delete User.password;
          res.render("userLogin");
        }
        //req.session.userLogged = User;
      })
      .catch((e) => console.log(e));
  },
        //   if (usuarioALoguearse == undefined) {
        //     return res.render ('userLogin', {errors: [
        //         {msg: "Credenciales invalidas"}
        //         ]});
        //     };


        //     req.session.userLogged = userToLog;
        //     res.redirect ("Login exitoso!");
        // } else {
        //     return res.render ('userLogin', {errors: errors.errors})
        // },
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
