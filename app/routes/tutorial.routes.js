module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/",auth, tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/",auth, tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published",auth, tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id",auth, tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id",auth, tutorials.delete);
  
    // Create a new Tutorial
    router.delete("/",auth, tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };