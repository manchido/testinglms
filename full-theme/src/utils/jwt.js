import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
// import axios from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

const setSession = (key,value) => {
  if (value) {
    localStorage.setItem(key, value);
    // axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem(key);
    // delete axios.defaults.headers.common.Authorization;
  }
};

const removeSession = (key) => {
  localStorage.removeItem(key);
};

const getSession = (key) => {
  const res = localStorage.getItem(key) || null;
  return res;
}

export { isValidToken, setSession, removeSession, getSession, verify, sign };
