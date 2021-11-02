const jwt = require("jsonwebtoken");

const config = process.env;



const verifyToken = (req, res, next) => {
  //const token=req.body.token;
  
  //token =  isset(req.body.token) ? req.body.token : ( isset(req.query.token) ? req.query.token : ( isset(req.headers["x-access-token"]) ? req.headers["x-access-token"] : '')); 

  if (!req.body) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(req.headers["x-access-token"], config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
   
    return res.status(401).send({
      status: 'error',
      msg: 'toen_error!',          
    });
  }
  return next();
};

module.exports = verifyToken;