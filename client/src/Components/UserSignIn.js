import React from 'react';


// UserSignIn - This component provides the "Sign In" screen by rendering 
// a form that allows a user to sign in using their existing account 
// information. The component also renders a "Sign In" button that when 
// clicked signs in the user and a "Cancel" button that returns the user 
// to the default route (i.e. the list of courses).

export default function UserSignIn() {

  function handleClick(event) {
    event.preventDefault(); 
    // location.href='index.html';
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>          
        <form>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" defaultValue="" />
          <button className="button" type="submit">Sign In</button>
          <button className="button button-secondary" onClick={handleClick}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>          
      </div>
    </main>
  );
}