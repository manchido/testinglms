import jwt from "jsonwebtoken";

export const getNudgetoken = ()  =>{
	// console.log('exp : ', token);
  const token = localStorage.getItem("nudgeToken")
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

