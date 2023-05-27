import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent) => {
  const WithAuthRedirect = (props) => {
    const navigate = useNavigate();
    // Check if the user is logged in
    const loggedInEmployeeRole = JSON.parse(sessionStorage.getItem('user'));  /* Add your logic to check if the user is logged in */

    if (!loggedInEmployeeRole) {
      // Redirect to the login page
      navigate('/')
    }

    // Render the component if the user is logged in
    return <WrappedComponent {...props} />;
  };

  return WithAuthRedirect;
};

export default withAuthRedirect;
