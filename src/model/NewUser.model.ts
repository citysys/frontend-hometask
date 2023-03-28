import { z } from "zod";

//took from upNext
//https://www.upnext.co.il/articles/israeli-id-numer-validation/
const idNumberValidator = (id: string): boolean => {
    id = String(id).trim();
    if (id.length > 9 || isNaN(+id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
}

const houseNumberValidator = (houseNumber: string)=> (/\d/).test(houseNumber)

export const NewUserSchema = z.object({
    name: z.string().regex(/[א-ת][א-ת]+(\ [א-ת][א-ת]+)+/,
                         { message: 'אנא הזן שם פרטי ומשפחה המכיל אותיות ורווחים בלבד' }),

    id: z.string().regex(/^[0-9]{9}$/, { message: 'מספר זהות חייב להכיל 9 ספרות בדיוק' })
                    .refine(idNumberValidator,{message: 'ישנה טעות במספר טעות הזהות'}),

    birthDate: z.coerce.date({invalid_type_error: 'אנא בחר תאריך', required_error: 'אנא בחר תאריך'})
                                .min(new Date("1900-01-01"), { message: "נראה כי אתה קצת יותר מידי מבוגר" })
                                .max(new Date(), { message: "כנראה שעוד לא נולדת" }),
    phone: z.string().regex(/^05\d{8}$/,
     { message: 'מספר נייד מכיל 10 ספרות ומתחיל בקידומת 05' }),

    email: z.string().email({ message: 'כתובת דואר אלקטרוני אינה תקינה' }),

    city: z.string().regex(/[א-ת]+/, { message: 'עיר אינה נמצאת ברשימת הערים' }),

    street: z.string().regex(/[א-ת]+/, { message: 'עיר אינה נמצאת ברשימת הערים' }),

    houseNumber: z.string().refine(houseNumberValidator, {message:'מספר בית חייב להכיל מספר'}),

    emailReceive: z.boolean(),

    agree: z.literal(true, {errorMap: () => ({ message: "על מנת להירשם עליך להסכים לתנאי השירות" })}),
})

export type NewUser = z.infer<typeof NewUserSchema>;

export const newUserValidator = (inputs: unknown) => NewUserSchema.safeParse(inputs)