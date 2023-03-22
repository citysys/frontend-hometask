import { StateCreator } from 'zustand';
import { UserSlice } from './user.types';

export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: {
    fullName: '',
    id: '',
    dateOfBirth:'',
    email: '',
    phone: '',
    city: '',
    street: '',
    homeNumber:'',
  },
});
