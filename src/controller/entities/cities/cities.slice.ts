import { Api } from './../../../DAL/Api';
import { CitiesSlice } from './cities.types';
import { StateCreator } from "zustand";

export const citiesSlice: StateCreator<CitiesSlice> = (set) => ({
    cities: [],
    setCities: async() => {
        set({cities: await Api.getCities()})
    }
});