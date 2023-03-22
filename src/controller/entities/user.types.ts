import { NewUser } from '../../model';

export interface UserSlice {
  user: NewUser;
  users: NewUser[];
  addUser: (user: {}) => void;
}
