import React, { useContext } from 'react';
import { AuthenticatedUserContext } from './Context';

export default function NotFound(props) {
  const context = useContext(AuthenticatedUserContext);

  return (
    <div>
      <h2>404 - The page you are looking for does not exist.</h2>
      <p>Detailed error message: {context.errorMessage}</p>
      <p>Click on 'Courses' (top left) to return to the main page.</p>
    </div>
  )
}