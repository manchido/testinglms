const bcrypt = require('bcryptjs');
const db = require("../models");
const Users = db.users;
const jwt = require("jsonwebtoken");

/*username: String,
email: String,
password: String,
status:Boolean */

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.lastName) {
      res.send({
      status: 'error',
      msg: 'Lastname can not be empty!',          
    });
   
  }
  if (!req.body.firstName) {
    
    res.send({
      status: 'error',
      msg: 'FirstName can not be empty!',          
    });
    
  }
  if (!req.body.email) {
 
    res.send({
      status: 'error',
      msg: 'Email can not be empty!',          
    });
   
  }
  if (!req.body.password) {
   
    res.send({
      status: 'error',
      msg: 'Password can not be empty!',          
    });
    
  }

  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      
      res.send({
        status: 'error',
        msg: 'All input is required',          
      });
    }

    console.log(req.body);

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      res.send({
        status: 'error',
        msg: 'User Already Exist. Please Login',          
      });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
   
    // Create user in our database
    const user = await Users.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      status: true,
      address: '908 Jack Locks',
      avatarUrl: 'https://i.stack.imgur.com/l60Hf.png',
      city: 'Rancho Cordova',
      company: 'Gleichner, Mueller and Tromp',
      country: 'Madagascar',     
      isVerified: false,     
      phoneNumber: '0000',
      role: '-',
      state: '-',     
      zipCode: '-',
    });
   
    console.log(user);
    if(user._id){ 

      var user1 = JSON.parse(JSON.stringify(user));

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      
      
      user1.password='';
      user1.displayName=user1.firstName+' '+user1.lastName;
      user1.role = 'admin';
      user1.accessToken = token;
      user1.photoURL=user1.avatarUrl;
      res.status(200).send({
        status: 'succes',
        msg: 'valid',
        data: user1,
      
      });
     
   }
   else{
    res.send({
      status: 'error',
      msg: 'Technical problem. Please try again later.',          
    });
   }
  } catch (err) {
    console.log(err);
    res.send({
      status: 'error',
      msg: 'catch error',          
    });
  }

};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    var user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {  
      
      var user1 = JSON.parse(JSON.stringify(user));

      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      
      
      user1.password='';
      user1.displayName=user1.firstName+' '+user1.lastName;
      user1.role = 'admin';
      user1.accessToken = token;
      user1.photoURL=user1.avatarUrl;
      res.status(200).send({
        status: 'succes',
        msg: 'valid',
        data: user1,
      
      });
    }else{
      res.status(200).send({
        status: 'error',
        msg: 'Please enter valid username and password',          
      });
    }
  
  } catch (err) {
    console.log(err);
  }
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  var condition = '';
  if (req.body.username) {
    condition = req.body.username ? { username: { $regex: new RegExp(req.body.username), $options: "i" } } : {};
  }
  if (req.body.email) {
    condition = req.body.email ? { email: { $regex: new RegExp(req.body.email), $options: "i" } } : {};
  }
  if (req.body.name) {
    condition = req.body.name ? { name: { $regex: new RegExp(req.body.name), $options: "i" } } : {};
  }

  // Users.find(condition)
  Users.find()
    .then(data => {
     
      res.status(200).send({
        status: 'succes',
        msg: 'valid',
        data: data,
      
      });


    })
    .catch(err => {
      res.status(500).send({
        status: 'error',
        msg:  err.message || "Some error occurred while retrieving users."       
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Users with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Users with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Users with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
        });
      } else {
        res.send({
          message: "Users was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Users with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all published Tutorials
exports.findByName = (req, res) => {
  var condition = req.body.name ? { name: { $regex: new RegExp(req.body.name), $options: "i" } } : {};
  Users.find({ condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};