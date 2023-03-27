import { z } from "zod";

//took from upNext
//https://www.upnext.co.il/articles/israeli-id-numer-validation/
const checkId = (id: string): boolean => {
    id = String(id).trim();
    if (id.length > 9 || isNaN(+id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
}

export const NewUserSchema = z.object({
    name: z.string().regex(/[א-ת][א-ת]+(\ [א-ת][א-ת]+)+/, { message: 'שם מלא הכולל שם פרטי ושם משפחה המכיל אותיות ורווחים בלבד' }),
    id: z.string().regex(/^[0-9]{9}$/, { message: 'מספר תעודת זהות יכול להכיל 9 ספרות בלבד' }),
    birthDate: z.date(),
    phone: z.string().regex(/^0\d{9}$/, { message: 'מספר טלפון נייד חייב להכיל 9 ספרות ולהתחיל בקידומת 0' }),
    email: z.string().email({ message: 'כתובת דואר אלקטרוני אינה תקינה' }),
    city: z.string().regex(/[א-ת]+/, { message: 'עיר אינה נמצאת ברשימת הערים' }),
    street: z.string().regex(/[א-ת]+/, { message: 'עיר אינה נמצאת ברשימת הערים' }),
    houseNumber: z.string(),
    emailReceive: z.boolean(),
    agree: z.boolean(),
})
.refine(data=> checkId(data.id),{
    message: 'ישנה טעות במספר טעות הזהות'
})
.refine(data=> (/\d/).test(data.houseNumber), {message:'מספר בית חייב להכיל מספר'})

export type NewUser = z.infer<typeof NewUserSchema>;
