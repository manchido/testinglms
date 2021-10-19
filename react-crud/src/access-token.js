import jwt from "jsonwebtoken";
import axios from "axios";

async function call_token(){
  const login_data = {email:"lim3@g.com",password:"1231"};
  const response = await axios.post('http://172.105.51.160/api/login', login_data);  
  console.log(response.data.token);
  //console.log(response[0].token);
  localStorage.setItem('id_token', response.data.token);
  return response.data.token;
    
}

async function check_token_expire(token){
	
	var decodedToken=jwt.decode(token, {complete: true});
	var dateNow = new Date();
	if(decodedToken.exp < dateNow.getTime()){
	  call_token().then(function(res) {
		return res;
	  });
	}
	
}

export default function axios_init() { 
	var token = localStorage.getItem('id_token');
	console.log('localStorage : ',token);
	if(token==='' || token===null || token==='null' || token==='undefined' || token===undefined){
	  call_token().then(function(res) {
		  token = res;
		  console.log('to--',token);
		  
			check_token_expire(token).then(function(res1) {
				token = res1;
				console.log('to c--',token);
				return token;
		  
			});
		  
	  });
	 
	  
	  
		
	}else{
		check_token_expire(token).then(function(res1) {
			token = res1;
			console.log('to c2--',token);
			return token;
	  
		});
		
	}
	
	
	
}





//instance.defaults.headers.common['x-access-token'] = token;

