export const getNudgetoken = ()  =>{
	// console.log('exp : ', token);
  const token = localStorage.getItem("nudgeToken")
	if(token){
  
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log('exp : ', decodedToken.exp);
    if (decodedToken.exp*1000 < Date.now()) {
      localStorage.removeItem("nudgeToken")
      window.location.href = "/"
    }
    return token;

  }
	window.location.href = "/"

}

export const getUserDetails = async (loggedUserId) =>{
   
  const nudgeToken = getNudgetoken()  
  const url = `${process.env.REACT_APP_API_URL}/api/users/getone`
  const requestOptions = {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'x-access-token': nudgeToken
      },
      body: JSON.stringify({id: loggedUserId}),
      Referer: "http://172.105.51.160/"
  }
  const response = await fetch(url, requestOptions)
  const data = await response.json();
  if(data) {
      //console.log("getUserDetails",data);
      return data;
      
  }
  else if(data.status === "error") {
      console.log("No record");
  }

};

