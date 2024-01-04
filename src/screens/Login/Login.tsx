import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { facebookLogo, googleLogo, trelloLogo } from '@assets';
import { useUser } from '@context';
import { useEffect, useState } from 'react';

function Login() {
  const { user, credentialsSignUp, credentialsSignIn, googleSignIn, facebookSignIn } = useUser();
  const navigate = useNavigate();
  const [isSignupScreen, setIsSignupScreen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  const handleCredentialsSubmit = async () => {
    if (isSignupScreen) {
      await handleSignUpWithCredentials();
    }
    handleSignInWithCredentials();
  }

  const handleSignUpWithCredentials = async () => {
    return credentialsSignUp(username, password);
  }

  const handleSignInWithCredentials = () => {
    return credentialsSignIn(username, password);
  }

  const handleSignInWithGoogle = () => {
    googleSignIn();
  }

  const handleSignInWithFacebook = () => {
    facebookSignIn();
  }

  return (
    <div className='login-wrapper'>
      <div className='login-wrapper__content'>
        <div className='header'>
          <img src={trelloLogo} alt='logo'/>
          {isSignupScreen ? <p>Log in to continue</p> : <p>Sign up to continue</p>}
        </div>
        <div className='credentials'>
          <input type='text' placeholder='Enter email'
                 onInput={e => setUsername((e.target as HTMLInputElement).value)}/>
          <input type='password' placeholder='Enter password'
                 onInput={e => setPassword((e.target as HTMLInputElement).value)}/>
          <button onClick={handleCredentialsSubmit}>Log in</button>
        </div>
        <div className='vendors'>
          <button className='vendors-button google' onClick={handleSignInWithGoogle}>
            <img src={googleLogo} alt='google logo'/>
            <p>Google</p>
          </button>
          <button className='vendors-button facebook' onClick={handleSignInWithFacebook}>
            <img src={facebookLogo} alt='facebook logo'/>
            <p>Facebook</p>
          </button>
        </div>
        <div className='footer'>
          {isSignupScreen ?
            <p onClick={() => setIsSignupScreen(false)}>Create an account</p> :
            <p onClick={() => setIsSignupScreen(true)}>Already have an account? Sign in</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;
