import jwt from "jsonwebtoken";

export const checkTokenStatus = (token)  =>{
	// console.log('exp : ', token);
	if(token){
    const decodedToken = jwt.decode(token, { complete: true });
    const dateNow = new Date();
    if (decodedToken.exp < dateNow.getTime()) {
      localStorage.removeItem("nudgeToken")
      window.location.href = "/"
    }
    return token;

  }
	window.location.href = "/"

}

