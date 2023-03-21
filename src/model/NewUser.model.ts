import { z } from "zod";

//   I made a helper function that verifies that the certificate
//  is identical according to the Israeli standard
const IsraeliIdNumberSchema = z.string().refine((value) => {
    return /^[1-9]\d{8}$/.test(value);
  }, "מספר תעודת זהות ישראלי לא חוקי");
  
  const birthdayValid = z.string().refine((value) => {
    return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
  }, "תאריך הלידה לא חוקי");
  
  
export const NewUserSchema = z.object({
    fullName: z.string().min(1, "שדה זה הוא חובה"),
    id:IsraeliIdNumberSchema,
    dateOfBirth:birthdayValid,
    phone: z.string().min(10, "תעודת זהות חייב להיות תקינה"),
    email: z.string().min(1, "שדה האימייל הוא חובה").email("האיימיל לא תקין "),
    city: z.string().min(1, "שדה זה הוא חובה"),
    street: z.string().min(1, "שדה זה הוא חובה"),
    homeNumber: z.string().min(1, "שדה זה הוא חובה"),
});


export const validateForm = (data: NewUser): boolean => {
  const result = NewUserSchema.safeParse(data);
  return result.success;
};


export type NewUser = z.infer<typeof NewUserSchema>;
