import { StateCreator } from 'zustand'
import { UserSlice } from './user.types'

const defaultUser = {
    fullName: '',
    id: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    city: '',
    street: '',
    houseNumber: '',
}

export const userSlice: StateCreator<UserSlice> = (set) => ({
    user: defaultUser,
})
