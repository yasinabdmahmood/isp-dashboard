import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent) => {
  const WithAuthRedirect = (props) => {
    // Check if the user is logged in
    const isLoggedIn =true;  /* Add your logic to check if the user is logged in */

    if (!isLoggedIn) {
      // Redirect to the login page
      return <Redirect to="/login" />;
    }

    // Render the component if the user is logged in
    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirect;
};

export default withAuthRedirect;
