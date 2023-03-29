import create, { SetState, StateCreator } from "zustand";
import { userSlice } from "./entities/user.slice";
import { FormActions, UserSlice } from "./entities/user.types";
type FormState = {
  isFormValid: boolean;
};
type StoreState = FormState & FormActions & UserSlice;

const formSlice: StateCreator<FormState & FormActions> = (set) => ({
  isFormValid: false,
  setFormValid: (isValid: boolean) => set({ isFormValid: isValid }),
});

export const useStore = create<StoreState>((...args) => ({
  ...formSlice(...args),
  ...userSlice(...args),
}));
