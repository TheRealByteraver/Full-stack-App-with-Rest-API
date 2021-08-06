import React, { useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from './Context';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {

  const context = useContext(AuthenticatedUserContext); 
  // useEffect(() => context.actions.signOut());

  return (
    <Route
      {...rest}
      render={props => context.authenticatedUser ? (
          children
        ) : (
          <Redirect to={{
            pathname: "/signin",
            state: { from: props.location }
          }} />
        )
      }
    />
  );
}

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { Consumer } from './Context';

// export default ({ component: Component, ...rest }) => {
//   return (
//     <Consumer>
//       {context => (
//         <Route
//           {...rest}
//           render={props => context.authenticatedUser ? (
//               <Component {...props} />
//             ) : (
//               <Redirect to={{
//                 pathname: '/signin',
//                 state: { from: props.location }
//               }} />
//             )
//           }
//         />
//     )}
//     </Consumer>
//   );
// };