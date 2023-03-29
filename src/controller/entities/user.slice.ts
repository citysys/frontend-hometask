// import { StateCreator } from "zustand";
// import { UserSlice } from "./user.types";

// export const userSlice: StateCreator<UserSlice> = (set) => ({
//   user: {
//     name: '',
//     id: '',
//     dateOfBirth:'',
//     email: '',
//     phone: '',
//     city: '',
//     street: '',
//     homeNumber:'',
//   }, 
//    users: [],
//   addUser: (user: {}) => {
//     set((state) => ({
//       users: [user, ...state.users],
//     }));
//   },});

import { StateCreator } from "zustand";
import { NewUser } from "../../model";
import { UserSlice } from "./user.types";

export const userSlice: StateCreator<UserSlice> = (set) => ({
  user: {
    name: "",
    id: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    homeNumber:1
  },
  saveUser: (user: NewUser) => {
    set(() => ({
      user,
    }));
  },
});
