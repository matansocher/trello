
export interface IUser {
  id: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  starredBoards?: string[];
}
