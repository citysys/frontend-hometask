import create, { State, SetState } from 'zustand';

type FormState = {
  isFormValid: boolean;
};

type FormActions = {
  setFormValid: (isValid: boolean) => void;
};

type UseFormStore = FormState & FormActions;

//  we're using useStore instead of useFormStore to access the setFormValid action from the Zustand store.
// We've also moved the validateForm function into a separate file for organization and reusability.

export const useStore = create<UseFormStore>((set: SetState<UseFormStore>) => ({
  isFormValid: false,
  setFormValid: (isValid: boolean) => set({ isFormValid: isValid }),
}));
