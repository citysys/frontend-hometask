import { z } from 'zod'

function isValidId(id: string): boolean {
    if (id.length > 9) return false
    const paddedId = id.length < 9 ? ('00000000' + id).slice(-9) : id
    return (
        Array.from(paddedId, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1)
            return counter + (step > 9 ? step - 9 : step)
        }) %
            10 ===
        0
    )
}

export const NewUserSchema = z.object({
    fullName: z.string().regex(/^[א-ת\s]+$/),
    id: z.string().refine((id) => isValidId(id)),
    birthDate: z.string(),
    phoneNumber: z.string().min(1).startsWith('05'),
    email: z.string().email(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.string().min(1),
})

export type NewUser = z.infer<typeof NewUserSchema>
