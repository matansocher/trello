import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { USER_INITIAL_STATE } from '@constants';
import { IUser } from '@models';
import { firebaseInitService, utilsService } from '@services';

interface IUserContextType {
  user: IUser;
  googleSignIn: () => void;
  logOut: () => void;
}

const UserContext = createContext<IUserContextType | null>(null);

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(USER_INITIAL_STATE);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseInitService.auth, provider)
  };

  const logOut = () => {
    signOut(firebaseInitService.auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseInitService.auth, (firebaseUser) => {
      const currentUser = utilsService.getUserFromGoogleUser(firebaseUser) as IUser;
      setUser(currentUser);
      console.log('user', currentUser)
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ googleSignIn, logOut, user }}>
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
