import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { USER_INITIAL_STATE } from '@constants';
import { IUser } from '@models';
import { firebaseInitService, firebaseService, utilsService } from '@services';

interface IUserContextType {
  user: IUser;
  credentialsSignUp: (username: string, password: string) => void;
  credentialsSignIn: (username: string, password: string) => void;
  googleSignIn: () => void;
  facebookSignIn: () => void;
  logOut: () => void;
}

const UserContext = createContext<IUserContextType | null>(null);

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(USER_INITIAL_STATE);

  const credentialsSignUp = (username: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseInitService.auth, username, password);
  };

  const credentialsSignIn = (username: string, password: string) => {
    return signInWithEmailAndPassword(firebaseInitService.auth, username, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(firebaseInitService.auth, provider)
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(firebaseInitService.auth, provider)
  };

  const logOut = () => {
    return signOut(firebaseInitService.auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseInitService.auth, (authUser) => {
      const currentUser = utilsService.getUserFromGoogleUser(authUser) as IUser;
      setUser(currentUser);
      firebaseService.saveUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, credentialsSignIn, credentialsSignUp, googleSignIn, facebookSignIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): IUserContextType {
  const user = useContext(UserContext);
  if (!user) {
      throw new Error('useUser must be used within a UserContextProvider');
  }
  return user;
}
