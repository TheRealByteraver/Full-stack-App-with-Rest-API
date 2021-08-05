import React, { useState } from 'react';
import Cookies from 'js-cookie';

const apiBaseUrl = 'http://localhost:5000/api';

const AuthenticatedUserContext = React.createContext();

export function Provider(props) {

  const [authenticatedUser, setAuthenticatedUser] = 
    useState(
      //Cookies.getJSON('authenticatedUser') || null
      null
    );

  // helper function to fetch the api with authorization headers 
  // (if applicable)
  const api = ( 
    path, method = 'GET', body = null, 
    requiresAuth = false, credentials = null) => {

    const url = apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      // btoa does base64 encoding which is required for an auth header
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`); 
      // add the auth header  
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    console.log(
      'Fetching the url ', url, 
      ', requiresAuth is ', requiresAuth,
      ', with method ', options.method,
      ', with body ', options.body,
      ', with headers: ', options.headers);
    return fetch(url, options);
  }  

  const getUser = async (emailAddress, password) => {
    const response = await api(
      `/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error('Error occured during fetch of /users');
    }
  }  

  const signIn = async (emailAddress, password) => {
    console.log('calling getUser(', emailAddress, ', ', password, ')');
    const user = await getUser(emailAddress, password);
    if (user !== null) {
      setAuthenticatedUser(() => {
        return {
          authenticatedUser: user,
        };
      });
      // Set cookie that will expire after 1 day:
      // docs at https://github.com/js-cookie/js-cookie#expires
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    console.log('SignIn() returned the user ', user);
    return user;
  }

  // Function to sign out a user
  const signOut = () => {
    console.log('Signing out user ', authenticatedUser);
    setAuthenticatedUser(() => {       
      return { 
        authenticatedUser: null 
      }
    });
    Cookies.remove('authenticatedUser');
  }

  return (
    <AuthenticatedUserContext.Provider value={{
        authenticatedUser,
        actions: {
          signIn,
          signOut
        } 
      }
    }>
      { props.children }
    </AuthenticatedUserContext.Provider>
  );
};

export const Consumer = AuthenticatedUserContext.Consumer;