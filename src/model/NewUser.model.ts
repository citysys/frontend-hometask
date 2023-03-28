import { z } from 'zod'
import { isValidCity, isValidId, isValidStreet } from './validation.service'

export const NewUserSchema = z.object({
    fullName: z.string().regex(/^[א-ת\s]+$/),
    id: z
        .string()
        .min(9)
        .refine((id) => isValidId(id)),
    birthDate: z.string().min(6),
    phoneNumber: z.string().min(10).startsWith('05'),
    email: z.string().email(),
    city: z
        .string()
        .min(2)
        .regex(/^[א-ת\s]+$/)
        .refine((city) => isValidCity(city)),
    street: z
        .string()
        .min(2)
        .regex(/^[א-ת\s]+$/)
        .refine((street) => isValidStreet(street)),
    houseNumber: z.string().min(1),
})

export type NewUser = z.infer<typeof NewUserSchema>
