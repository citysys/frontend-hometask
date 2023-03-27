import { NewUser } from './../../model/NewUser.model';
import { StateCreator } from "zustand";
import { UserSlice } from "./user.types";

export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: {
    name: '',
    id: '',
    birthDate: new Date(),
    phone: '',
    email: '',
    city: '',
    street: '',
    houseNumber: '',
    emailReceive: true,
    agree: false
  },

  setUser: (newUser: NewUser)=>{
    set({user: newUser})
  },
  
});
