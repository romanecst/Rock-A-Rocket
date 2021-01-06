var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
const userModel = require('../models/users');
const tripModel = require('../models/trips');

//enregistrement nouvel utilisateur en bdd
router.post('/sign-up', async function (req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

//verification que l'adresse mail de l'utilisateur existe
  const searchUser = await userModel.findOne({
    email: req.body.email
  })

  if (searchUser) {
    error.push('User already exists')
  }

  if (!req.body.username || !req.body.email || !req.body.password) {
    error.push('Empty fields')
  }
//s'il n'y a pas d'erreur enregistrement de l'utilisateur en bdd
  if (error.length == 0) {

    var salt = uid2(32)
    var newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
    })

    saveUser = await newUser.save();
//si l'enregistrement fonctionne stockage du token dans une variable pour le revoyer vers le front
    if (saveUser) {
      result = true,
      token = saveUser.token
    }
  }

  res.json({ result, saveUser, error, token })
});

//connection d'un utilisateur existant
router.post('/sign-in', async function (req, res, next) {

  var error = [];
  var result = false;
  var user = null;
  var token = null;

  if (!req.body.email || !req.body.password) {
    error.push('Empty fields')
  }
//récupération des données de l'utilisateur grace à  l'adresse mail
  if (error.length == 0) {
    const user = await userModel.findOne({
      email: req.body.email,
    })

    //si l'utilisateur existe chiffrage du mot de passe tapé pour verifier s'il correspond au mot de pass chiffré en bdd
    if (user) {
      const passwordEncrypt = SHA256(req.body.password + user.salt).toString(encBase64)
//s'il correspond stockage du token dans une variable pour le revoyer vers le front
      if (passwordEncrypt == user.password) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('Incorrect password')
      }
    } else {
      error.push('Incorrect email')
    }
  }

  res.json({ result, user, error, token })
});

router.post('/user', async function (req, res, next) {

  var result = false;
  var user = null;
//récupération des données de l'utilisateur grace au token
  if (req.body.token) {
    user = await userModel.findOne({
      token: req.body.token,
    });

    if (user) {
      result = true;
    }
  }

  res.json({result, user})
});

router.post('/trips', async function (req, res, next) {

  var result = false;
  var user = null;
  var trips = [];
//récupération des l'ID de l'utilisateur grace au token
  if (req.body.token) {
    user = await userModel.findOne({
      token: req.body.token,
    });
//s'il exits récupération de tous les voyages de l'utilisateur contenus dans la collection trips
    if (user) {
      trips = await tripModel.find({users:{$all:  user._id}})
      if(trips.length !== 0){
        result = true;
      }
    }
  }

  res.json({result, trips})
});

//ajout voayge en bdd
router.post('/addTrip', async function (req, res, next) {

  var result = false;

  console.log(req.body.token);
//récupération des l'ID de l'utilisateur grace au token
  const user = await userModel.findOne({
    token: req.body.token
  });
//verification que le voyage existe déjà
  const searchTrip = await tripModel.findOne({
    departure: req.body.departure,
    company: req.body.company,
    rocket: req.body.rocket, 
  });
//s'il existe ajout de l'ID de l'utilisateur au tableau de clés étrangères
  if (searchTrip) {

    var newTrip = await tripModel.updateOne(
      {departure: req.body.departure,
        agency: req.body.agency,
        rocket: req.body.rocket, 
      },{
        $push: {users: user._id}
      });

    if(newTrip.modifiedCount === 1){
      result = true
    }
//sinon créqtion d'un nouveau document voyage avec l'ID de l'utilisateur
  }else{

    var newTrip = new tripModel({
      city: req.body.city,
      destination: req.body.destination,
      departure: req.body.departure,
      agency: req.body.agency,
      rocket: req.body.rocket, 
      price: req.body.price,
      users:[user._id],
    })

    saveTrip = await newTrip.save();

    if (saveTrip) {
      result = true;
    }
  }

  res.json(result)
});

module.exports = router;
