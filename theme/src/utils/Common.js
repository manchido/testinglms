// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    const res = sessionStorage.getItem('token') || null;
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