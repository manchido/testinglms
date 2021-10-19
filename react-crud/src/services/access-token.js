import jwt from "jsonwebtoken";
import axios from "axios";

 function call_token(){
   const login_data = {email:"lim3@g.com",password:"1231"};
   axios.post('http://172.105.51.160/api/login', login_data) .then( (result) => {
         console.log(result.data.token);
		localStorage.setItem('id_token', result.data.token);
		return result.data.token;
    });  
 
  //console.log(response[0].token);
  
    
}

function check_token_expire(token){
	
	var decodedToken=jwt.decode(token, {complete: true});
	var dateNow = new Date();
	if(decodedToken.exp < dateNow.getTime()){
	
	  const login_data = {email:"lim3@g.com",password:"1231"};
	   axios.post('http://172.105.51.160/api/login', login_data) .then( (result) => {
			 console.log(result.data.token);
			localStorage.setItem('id_token', result.data.token);
			return result.data.token;
		}); 
	  
	  
	}
	return token;
	
}

function axios_init() { 
	var token = localStorage.getItem('id_token');
	console.log('localStorage : ',token);
	if(token==='' || token===null || token==='null' || token==='undefined' || token===undefined){
	  
	
		const login_data = {email:"lim3@g.com",password:"1231"};
	   axios.post('http://172.105.51.160/api/login', login_data) .then( (result) => {
			 console.log(result.data.token);
			localStorage.setItem('id_token', result.data.token);
			return check_token_expire(result.data.token);
		});
		
	  //var res = call_token();
	   
	  //return check_token_expire(res);
	 
	  
	  
		
	}else{
		
		
		return check_token_expire(token);
			
		
	}
	
	
}


export {axios_init};
//module.export = axios_init;

//export {axios_init};





//instance.defaults.headers.common['x-access-token'] = token;

