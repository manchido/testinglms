require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require("./app/models");

const Users = db.users;

const app = express();

var corsOptions = {
  origin: "http://localhost:8003"
};

app.use(cors(corsOptions));
app.use(express.json());

// parse requests of content-type - application/json
//app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post("/api/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { firstName, lastName, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && firstName && lastName)) {
        
        res.status(200).json({
          status: 'error',
          msg: 'All input is required',          
        });
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await Users.findOne({ email });
  
      if (oldUser) {
        res.status(200).json({
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
      });
  
      if(user._id){
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
           process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
      // save user token
      
      const result = user;      
      result.token = token;
  
      // return new user
     
      res.status(200).json({
        status: 'succes',
        msg: 'valid',
        data: result,
        token:result.token
      });
     }
     else{
      res.status(200).json({
        status: 'error',
        msg: 'Technical problem. Please try again later.',          
      });
     }
    } catch (err) {
      res.status(200).json({
        status: 'error',
        msg: err,          
      });
    }
    // Our register logic ends here
  });



app.post("/api/login", async (req, res) => {

    // Our login logic starts here
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
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        //console.log('token : ',token);
        // save user token
        //user['token'] = token;
        
        const result = user;
        //result.token = token;
        result.token = token;
        // user
        console.log('result : ',result.token);

        //const returnedTarget = Object.assign(user, { token: result.token});

        console.log('result : ',result);
        res.status(200).json({
          status: 'succes',
          msg: 'valid',
          data: result,
          token:result.token
        });
      }else{
        res.status(200).json({
          status: 'error',
          msg: 'Please enter valid username and password',          
        });
      }
     
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


// set port, listen for requests
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}.');
});


//connect mangoose db


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



// Set routes 
require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);