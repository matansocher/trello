import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@context';
import { useEffect } from 'react';

function Login() {
  const { user, googleSignIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  const handleSignInWithGoogle = () => {
    googleSignIn();
  }

  return (
    <div className=''>
      <p>Login</p>
      {/*<p>{user?.email}</p>*/}
      <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default Login;
