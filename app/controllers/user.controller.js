const bcrypt = require('bcryptjs');
const db = require("../models");
const Users = db.users;
const jwt = require("jsonwebtoken");
const path = require('path')

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


    let data = req.body;  
    let filename = '';
    let filepath = '';

    if (req.files) {
      const myFile = req.files.avatarFile;
      filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+path.extname(myFile.name);
    
      console.log('ext : ',filename);
      filepath = await fileUpload(myFile,filename);    
      filepath = req.protocol+"://"+req.headers.host+filepath;
    }

    if(filepath !== '')
    {      
      data.avatarUrl = filepath;
      data.avatarName = filename;      
    }



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
   
    data.firstName=firstName;
    data.lastNamee=lastName;    
    data.avatarUrl = filepath;
    data.avatarName = filename;
    data.email = email.toLowerCase();
    data.password = await bcrypt.hash(password, 10);
    data.status= true;
    data.address= '908 Jack Locks';
    data.avatarUrl= 'https://i.stack.imgur.com/l60Hf.png';
    data.city= 'Rancho Cordova';
    data.company= 'Gleichner, Mueller and Tromp';
    data.country= 'Madagascar';     
    data.isVerified= false;     
    data.phoneNumber= '0000000000';
    data.role= '-';
    data.state= '-';    
    data.zipCode= '-';



   
    // Create user in our database
    const user = await Users.create(
      data
    );
   
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
        status: 'success',
        msg: 'User created successfully.',
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
        status: 'success',
        msg: 'valid',
        data: user1,
      
      });
    }else{
      res.status(400).send({
        status: 'invalid',
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
  Users.find().select({_id: 1,  email: 1,firstName:1})
    .then(data => {
     
      res.status(200).send({
        status: 'success',
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
  const id = req.body.id;

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

const fileUpload = async (myFile,filename) => {
  
   return new Promise(resolve => {
    
    myFile.mv(`./public/profilepic/${filename}`).then(function(result) {
      resolve('/public/profilepic/'+filename);
    })  
   
    
  });
  


}

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(200).send({
      status: 'error',
      msg: 'Input data can not empty'  
    });
  }

  //console.log(req.body);
  //console.log(req.files);
  let data = req.body;
  
  let filename = '';
  let filepath = '';

  if (req.files) {
    const myFile = req.files.avatarFile;
    filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+path.extname(myFile.name);
   
    console.log('ext : ',filename);
    filepath = await fileUpload(myFile,filename);    
    filepath = req.protocol+"://"+req.headers.host+filepath;
  }

  if(filepath !== '')
  {
    //data = JSON.parse(JSON.stringify(data));
    data.avatarUrl = filepath;
    data.avatarName = filename;
    //data = JSON.stringify(data);
  }
  console.log('data : ',data);  
  const id = req.body.id;
  //avatarUrl
  Users.findByIdAndUpdate(id,data, { useFindAndModify: true })
    .then(data => {
      if (!data) {
        res.status(200).send({
          status: 'error',
          msg: `Cannot update Users with id=${id}. Maybe User was not found!`
         
        });
      } else res.send({ 
        status: 'success',
        msg: "User was updated successsfully." 
      });
    })
    .catch(err => {
      res.status(200).send({
        status: 'error',
        msg: "Error occured while data upadting.Please try again later" 
      });
    }); 
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.send({
          status: 'success',          
          msg: `Cannot delete Users with id=${id}. Maybe Users was not found!`
        });
      } else {
        res.send({
          status: 'success',
          msg: "User was deleted successsfully." 
          
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 'success',        
        msg: "Could not delete Users with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successsfully!`
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