// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    const res = sessionStorage.getItem('api_token') || null;
    return res;
  } 
   
  
  
  // remove the token and user from the session storage
  export const removeUserSession = (key) => {
    sessionStorage.removeItem(key);
    
  }
  
  // set the token and user from the session storage
  export const setUserSession = (key, value) => {
    sessionStorage.setItem(key, value);    
  }

  /* export const checkApiToken = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/token`, { email:'udgeapi@gmail.com', password: 'Nud@g#126' }).then(response => {
        
      if (response.data.msg === 'valid') {
         setUserSession('user_token',response.data.token);
      }
  }
} */