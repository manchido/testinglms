import axios from "axios";
import jwt from "jsonwebtoken";
//import axios_init from "./services/access-token";
//var axios_init = require('./services/access-token.js');
//var tt = axios_init.axios_init();
//var ss= process.binding('util').getPromiseDetails(tt)[1];
//console.log(tt);
//tt.then(function(result) { console.log.result});




/* async function call_token(){
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
	  return await call_token();
	}
	else{ return token; }
		
	
}

function axios_init() { 
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
	
	
	
}; */

const instance = axios.create({
  baseURL: "http://172.105.51.160/api",
  headers: {
	"Content-type": "application/json",	
  }
});




instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response ? error.response.status : null;
	console.log("eroro");
    if (status === 401) {
      //window.location.replace('/logout');
      //sessionStorage.removeItem('access_token');
      //sessionStorage.removeItem('refresh_token');
	  localStorage.setItem('id_token','');
	  refresh();
	  window.location.reload();
    }
    // status might be undefined
    if (!status) {
       localStorage.setItem('id_token','');
	  refresh();
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(config => {
	//var yy = refresh();
	//console.log(yy);
    config.headers.common['x-access-token'] = localStorage.getItem('id_token');
    return config;
});




//axios_init();

function check_token_expire(token){
	
	var decodedToken=jwt.decode(token, {complete: true});
	var dateNow = new Date();
	if(decodedToken.exp < dateNow.getTime()){
	
			localStorage.setItem('id_token','');
			return refresh();
		
	  
	}
	return token;
	
}

function refresh() {
  return new Promise((resolve, reject) => {
    var token = localStorage.getItem('id_token');
	if(token==='' || token===null || token==='null' || token==='undefined' || token===undefined){
		const login_data = {email:"lim3@g.com",password:"1231"};
		instance.post('http://172.105.51.160/api/login', login_data).then((response) => {
		  localStorage.setItem('id_token', response.data.token);
		  return resolve(response.data.token);
		}).catch((error) => {
		  //destroyToken();
		  //window.location.replace('/logout');
		  return reject(error);
		});
	}
	
	else{		
		return resolve(check_token_expire(token));		
	}
	
	
  });
}

function axios_init() { 
	var token = localStorage.getItem('id_token');
	console.log('localStorage : ',token);
	if(token==='' || token===null || token==='null' || token==='undefined' || token===undefined){
	  
	
		const login_data = {email:"lim3@g.com",password:"1231"};
	   axios.post('http://172.105.51.160/api/login', login_data) .then( (result) => {
			 console.log(result.data.token);
			localStorage.setItem('id_token', result.data.token);
			//instance.defaults.headers.common['x-access-token'] = result.data.token;
			return check_token_expire(result.data.token);
			
		});
		
	  //var res = call_token();
	   
	  //return check_token_expire(res);
	 
	  
	  
		
	}else{
		
		
		var s_token = check_token_expire(token);
		//instance.defaults.headers.common['x-access-token'] = s_token;
		return s_token;
			
		
	}
	
	
}




//module.exports.axios_init = axios_init;
//const token = localStorage.getItem('id_token');


//console.log('after : ',token);

//export default axios_init(); 

/*  instance.interceptors.request.use(function (config) {
    //const token = localStorage.getItem('token');
	 call_token().then(function(res) {
		console.log('mm2-',res);
			 config.headers.common.accesstok =  res;
			 return config;
	  
		});
   
    
  });  */


 /* var uu = axios_init().then(function(res) {
	console.log('mm-',res);
    return res;
  }); */ 
export default instance; 

