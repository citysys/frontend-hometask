import { StateCreator } from "zustand";
import { Api } from "../../../DAL/Api";
import { StreetsSlice } from "./streets.types";

export const streetsSlice: StateCreator<StreetsSlice> = (set)=> ({
    streets: [],
    setStreets: async (street: string)=> set({streets: await Api.getStreets(street)})
})