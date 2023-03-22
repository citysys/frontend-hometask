import { z, ZodType } from 'zod';

export type FormData = {
  fullName: string;
  userId: string;
  birthDate: Date;
  email: string;
  phone: string;
  city: string;
  street: string;
  houseNumber: string;
};

export const NewUserSchema: ZodType = z.object({
  fullName: z.string().trim().min(5).max(30),
  userId: z
    .string()
    .trim()
    .refine((val: string) => {
      if (val.length !== 9) {
        return false;
      }
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        const digit = parseInt(val.charAt(i), 10);
        sum +=
          ((i % 2 === 0 ? digit * 1 : digit * 2) % 10) +
          Math.floor((i % 2 === 0 ? digit * 1 : digit * 2) / 10);
      }
      if ((sum + parseInt(val.charAt(8), 10)) % 10 === 0) {
        return true;
      } else {
        return false;
      }
    }),
  birthDate: z.coerce.date().max(new Date()),
  email: z.string().trim().email(),
  phone: z.string().trim().startsWith('0').length(10),
  city: z
    .string()
    .trim()
    .refine((val: string) => val !== ''),
  street: z

    .string()
    .trim()
    .min(2)
    .refine((val: string) => val !== ''),
  houseNumber: z.string().trim().min(1),
});

export type NewUser = z.infer<typeof NewUserSchema>;
