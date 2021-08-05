import React from 'react';
import { Consumer } from './Context';

// UserSignIn - This component provides the "Sign In" screen by rendering 
// a form that allows a user to sign in using their existing account 
// information. The component also renders a "Sign In" button that when 
// clicked signs in the user and a "Cancel" button that returns the user 
// to the default route (i.e. the list of courses).

export default function UserSignIn() {

  // const authenticatedUser = useContext(AuthenticatedUserContext);
  // console.log('authenticatedUser: ', authenticatedUser);

  return (
    <Consumer>
      { context => {
        let emailAddress, password;
        const { actions } = context;

        function handleClick(event) {
          event.preventDefault(); 
        }

        function handleSubmit(event) {
          event.preventDefault();
          console.log('trying to sign in: ', emailAddress.value, ':', password.value);
          actions.signIn(emailAddress.value, password.value); 
        }

        return (
          <main>
            <div className="form--centered">
              <h2>Sign In</h2>          
              <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" defaultValue="" 
                  ref={ (input) => emailAddress = input }
                />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" defaultValue="" 
                  ref={ (input) => password = input }
                />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleClick}>Cancel</button>
              </form>
              <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>          
            </div>
          </main>
        );
        }
      }
    </Consumer>
  );
}