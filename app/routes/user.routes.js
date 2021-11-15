module.exports = app => {
    const users = require("../controllers/user.controller.js");  
    var router = require("express").Router();
    const auth = require("../middleware/auth.js");
  
    // Create a new Tutorial
    router.post("/create",  users.create);
    router.post("/login",  users.login);
  
    // Retrieve all Tutorials
    router.post("/getall",auth, users.findAll);
    router.post("/getone",auth, users.findOne);
  
    // Retrieve all published Tutorials
    router.post("/findbyname",auth, users.findByName);
  
    // Retrieve a single Tutorial with id
    //router.get("/:id", users.findOne);
  
    // Update a Tutorial with id
    router.post("/update",auth, users.update);
    router.put("/:id",auth, users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id",auth, users.delete);
  
    // Create a new Tutorial
    router.delete("/",auth, users.deleteAll);
  
    app.use('/api/users', router);
  };