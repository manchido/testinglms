module.exports = app => {
    const users = require("../controllers/user.controller.js");  
    var router = require("express").Router();
    const auth = require("../middleware/auth.js");
  
    // Create a new Tutorial
    router.post("/create",auth,  users.create);
    router.post("/login",auth,  users.login);
  
    // Retrieve all Tutorials
    router.post("/findbycolumn", users.findAll);
  
    // Retrieve all published Tutorials
    router.post("/findbyname", users.findByName);
  
    // Retrieve a single Tutorial with id
    //router.get("/:id", users.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };