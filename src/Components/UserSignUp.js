import React from 'react';

// UserSignUp - This component provides the "Sign Up" screen by rendering 
// a form that allows a user to sign up by creating a new account. The 
// component also renders a "Sign Up" button that when clicked sends a POST 
// request to the REST API's /api/users route and signs in the user. This 
// component also renders a "Cancel" button that returns the user to the 
// default route (i.e. the list of courses).

export default function UserSignUp() {

  function handleClick(event) {
    event.preventDefault(); 
    // location.href='index.html';
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>          
        <form>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" defaultValue="" />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" defaultValue="" />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" defaultValue="" />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" defaultValue="" />
          <button className="button" type="submit">Sign Up</button>
          <button className="button button-secondary" onClick={handleClick}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
      </div>
    </main>
  );
}