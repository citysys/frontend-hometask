// import { NewUser } from "../../model";
// export interface UserSlice {
//   [x: string]: any;
//   user: NewUser;

// }

// export type FormActions = {
//   setFormValid: (isValid: boolean) => void;
// };

import { NewUser } from "../../model";
export interface UserSlice {
  user: NewUser;
  saveUser: (user: NewUser) => void;
}

export type FormActions = {
  setFormValid: (isValid: boolean) => void;
};
