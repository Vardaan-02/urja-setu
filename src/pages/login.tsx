import React from 'react';
import handleGoogleSignIn from '../api/auth/google_auth';

const Login = () => {
  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
