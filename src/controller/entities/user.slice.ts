import { StateCreator } from 'zustand';
import { UserSlice } from './user.types';

export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: {
    fullName: '',
    userId: '',
    birthDate: new Date(),
    email: '',
    phone: '',
    city: '',
    street: '',
    houseNumber: '',
  },
  users: [],
  addUser: (user) => {
    set((state) => ({
      users: [user, ...state.users],
    }));
  },
});
