import { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {  Alert } from '@material-ui/core';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession, removeSession } from '../utils/jwt';
import http from "../utils/http-common";




// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession('accessToken', accessToken);

          const response = await axios.get('/api/account/my-account');
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {


    http.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password }).then(response => {
      console.log(response); 
      if (response.data.msg === 'valid') {

        console.log(response.data.data.accessToken);
        const accessToken1  = response.data.data.accessToken;
        const user = response.data.data;
        console.log(accessToken1);
        setSession('accessToken', accessToken1);
        dispatch({
          type: 'LOGIN',
          payload: {
            user
          }
        });
        navigate('/dashboard/app', { replace: true });
      }
      else {
        console.log('res:',response.data);
        // return response.data;
        return [400, { message: 'There is no user corresponding to the email address.' }];      
       
      }
    }).catch(error =>{
      console.log('error:',error);
      setShowAlert(error.data);
      alert(error);
      setError({ afterSubmit: error.message });
      

    });

  };

  const register = async (email, password, firstName, lastName) => {


    http.post(`${process.env.REACT_APP_API_URL}/api/users/create`, {
      email, password, firstName,
      lastName
    }).then(response => {
      // console.log(response); 
      if (response.data.msg === 'valid') {

        // console.log(response.data.data.accessToken);
        const { accessToken } = response.data.data.accessToken;
        const user = response.data.data;

        setSession('accessToken', accessToken);
        dispatch({
          type: 'REGISTER',
          payload: {
            user
          }
        });
        navigate('/dashboard/app', { replace: true });
      }
      else {

        setError("username or password incorrect.");
      }
    });



  };

  const logout = async () => {
    removeSession('accessToken');
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => { };

  const updateProfile = () => { };

  return (
   
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    
    </AuthContext.Provider>
     
  );
}

export { AuthContext, AuthProvider };
