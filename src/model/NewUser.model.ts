import { z } from "zod";


  const validateId = z.string().refine((value: any) => {
    value = value.trim();
    if (value.length !== 9 || isNaN(value)) return false;
    const checkDigit = parseInt(value.charAt(8));
    const sum = Array.from(value.slice(0, 8), Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }, 0);
    return (sum + checkDigit) % 10 === 0;
  }, "מספר תעודת זהות לא חוקי");
  
  const birthdayValid = z.string().refine((value) => {
    return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
  }, "תאריך הלידה לא חוקי");
  
  
  export const NewUserSchema = z.object({
    name: z.string().min(1, "שדה זה הוא חובה"),
    id: validateId,
    dateOfBirth: birthdayValid,
    phone: z.string().min(10, "מספר פלאפון לא תקין").max(12),
    email: z.string().min(1, "שדה האימייל הוא חובה").email("האיימיל לא תקין "),
    city: z.string().min(1, "שדה זה הוא חובה"),
    street: z.string().min(1, "שדה זה הוא חובה"),
    homeNumber: z.number().min(1, "שדה זה הוא חובה"),
  });
  export const validateForm = (data: NewUser): boolean => {
    const result = NewUserSchema.safeParse(data);
    return result.success;
  };
  
export type NewUser = z.infer<typeof NewUserSchema>;
