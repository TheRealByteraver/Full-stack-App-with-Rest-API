import React, { useContext } from 'react';
import { AuthenticatedUserContext } from './Context';

export default function UnhandledError(props) {
  const context = useContext(AuthenticatedUserContext);

  return (
    <div>
      <h2>Error: a fatal error occured, your request could not be handled.</h2>
      <p>Detailed error message: {context.errorMessage}</p>
      <p>Click on 'Courses' (top left) to return to the main page.</p>
    </div>
  )
}