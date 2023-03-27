import { z } from 'zod'

function isValidId(value: string): boolean {
    const idStr = value.toString()
    if (idStr.length > 9) return false
    const paddedId = idStr.length < 9 ? ('00000000' + idStr).slice(-9) : idStr
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
    fullName: z.string({
        required_error: 'Name is required',
    }),
    id: z.string().refine((val) => isValidId(val), {
        message: 'ת.ז אינה תיקנית, אנא נסה שנית',
    }),
    birthDate: z.string(),
    phoneNumber: z.string().min(10, { message: 'הנייד אינו תקני, אנא נסה שנית' }).startsWith('05', {
        message: 'נייד אינו תקני, אנא נסה שנית',
    }),
    email: z.string().email({ message: 'המייל אינו תקני, אנא נסה שנית' }),
    city: z.string(),
    street: z.string(),
    houseNumber: z.string().min(1),
})

export type NewUser = z.infer<typeof NewUserSchema>
