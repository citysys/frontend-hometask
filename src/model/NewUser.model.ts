import { z } from "zod";

/* 
The Algorithm works like this: the identification number must be 9 digits long.
If it doesn't happen, and it might indeed not happen - since the first part of the number
can also consist of 8 digits, the missing positions will be filled with zeros on the left. 
For example, for the ID number 123456, the first part is 12345 and the check digit is 6.
The number does not have 9 digits, so it will be completed to 000123456. 
Now that we have a 9-digit ID number, we can follow the algorithm.
*/

const IsraeliIdNumberSchema = z.string().refine((value: any) => {
  value = value.trim();
  if (value.length !== 9 || isNaN(value)) return false;
  const checkDigit = parseInt(value.charAt(8));
  const sum = Array.from(value.slice(0, 8), Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
  }, 0);
  return (sum + checkDigit) % 10 === 0;
}, "מספר תעודת זהות ישראלי לא חוקי");

const birthdayValid = z.string().refine((value) => {
  return /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
}, "תאריך הלידה לא חוקי");



export const NewUserSchema = z.object({
  fullName: z.string().min(1, "שדה זה הוא חובה"),
  id: IsraeliIdNumberSchema,
  dateOfBirth: birthdayValid,
  phone: z.string().min(10, "מספר פלאפון לא תקין"),
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
