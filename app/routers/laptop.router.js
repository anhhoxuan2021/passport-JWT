'use strict';
module.exports = app =>{
    
    const userController = require("../controllers/user.controller");

    var router = require("express").Router();

   
    router.post("/register", userController.sign_up);
    router.post("/login", userController.login);
    //router.post("/logout", userController.userLogout);

    router.post('/logout', function(req, res, next){
      req.logout(function(err) {
        if (err) { return next(err); }
        //res.redirect('/');
        res.json({ message: true });
      });
    });


    app.use('/api', router);
  };