import React, { useContext } from 'react';
import { AuthenticatedUserContext } from './Context';

export default function Forbidden(props) {
  const context = useContext(AuthenticatedUserContext);

  return (
    <div>
      <h2>Forbidden - you do not have access to the requested resource.</h2>
      <p>Detailed error message: {context.errorMessage}</p>
      <p>Click on 'Courses' (top left) to return to the main page.</p>
    </div>
  )
}