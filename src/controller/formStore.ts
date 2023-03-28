// import { create } from "zustand";
// import { userSlice } from "./entities/user.slice";
// import { UserSlice } from "./entities/user.types";

// type Store = UserSlice;

// export const useStore = create<Store>((...slices) => ({
//   ...userSlice(...slices),
// }));


import { create } from 'zustand';

interface FormValues {
  fullName: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  birthDate: Date | null;
  city: string;
  street: string;
}

interface FormStore {
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formValues: {
    fullName: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    birthDate: null,
    city: '',
    street: '',
  },
  setFormValues: (values: FormValues) =>
    set((state) => ({ formValues: { ...state.formValues, ...values } })),
}));
