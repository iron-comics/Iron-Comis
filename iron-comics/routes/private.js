const express = require('express');
const privateRoutes  = express.Router();
const List = require("../models/List");
const Comic = require("../models/Comic");
const User = require("../models/User");

/* GET home page */
privateRoutes.get('/user', (req, res, next) => {
  res.render('private/user', {user:req.user});
});

/* CRUD -> Udpate, show book update form */
privateRoutes.get("/edit", (req, res) => {
User.findById(req.params.id).then(user => {
    res.render("private/edit", { user:req.user });
  });
});

/* CRUD -> Udpate, update the book in DB */
privateRoutes.post("/edit", (req, res) => {
  const { firstname, lastname, birthday, email, username } = req.body;
  const updates = { firstname, lastname, birthday, email, username };
  User.findByIdAndUpdate(req.user.id, updates).then(() => {
    res.redirect("/private/user");
  });
});

/* CRUD -> Delete the book in DB */
privateRoutes.get("/delete", (req, res) => {
  User.findByIdAndRemove(req.user.id).then(() => {
    res.redirect("/");
  });
});

privateRoutes.get("/lists", (req, res) => {
  List.find({id_user:req.user.id})
  .populate("id_comic", "title img_icon")
  
  .then( list => {
    console.log(list.id_comic)
    res.render("private/comic_lists", {user:req.user, list:list.id_comic})
  });
})

module.exports = privateRoutes;
