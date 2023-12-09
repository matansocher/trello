import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { USER_INITIAL_STATE } from '@constants';
import { IUser } from '@models';

interface UserContextType {
  userState: IUser;
  updateUserState: Dispatch<SetStateAction<IUser>>;
}

const UserContext = createContext<UserContextType | null>(null);

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<IUser>(USER_INITIAL_STATE);

  const updateUserState: UserContextType['updateUserState'] = (newState: SetStateAction<IUser>) => {
    setUserState(newState);
  };

  return (
    // Step 5: Provide the context value to children components
    <UserContext.Provider value={{ userState, updateUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextType {
  const user = useContext(UserContext);
  if (!user) {
      throw new Error('useUser must be used within a UserContextProvider');
  }
  return user;
}
