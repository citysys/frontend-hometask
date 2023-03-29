import { create } from "zustand";
import { citiesSlice } from "./entities/cities/cities.slice";
import { CitiesSlice } from "./entities/cities/cities.types";
import { streetsSlice } from "./entities/streets/streets.slice";
import { StreetsSlice } from "./entities/streets/streets.types";
import { userSlice } from "./entities/user/user.slice";
import { UserSlice } from "./entities/user/user.types";

type Store = UserSlice & CitiesSlice & StreetsSlice;

export const useStore = create<Store >((...slices) => ({
  ...userSlice(...slices),
  ...citiesSlice(...slices),
  ...streetsSlice(...slices),
}));
