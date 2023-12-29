import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { USER_INITIAL_STATE } from '@constants';
import { IUser } from '@models';

interface IUserContextType {
  userState: IUser;
  updateUserState: Dispatch<SetStateAction<IUser>>;
}

const UserContext = createContext<IUserContextType | null>(null);

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<IUser>(USER_INITIAL_STATE);

  const updateUserState: IUserContextType['updateUserState'] = (newState: SetStateAction<IUser>) => {
    setUserState(newState);
  };

  return (
    <UserContext.Provider value={{ userState, updateUserState }}>
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
