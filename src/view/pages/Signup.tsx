import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../components/Input'
import { SubmitButton } from '../components/SubmitButton'
import { NewUserSchema } from '../../model/NewUser.model'

interface iFormInputs {
    fullName: string
    id: number
    birthDate: string
    phoneNumber: string
    email: string
    city: string
    street: string
    houseNumber: number
}

const user1 = {
    fullName: 'John Doe',
    id: 319153726,
    birthDate: '1990-01-01',
    phoneNumber: '05242517190',
    email: 'johndoeexampl@e.com',
    city: 'Tel Aviv',
    street: 'Main Street',
    houseNumber: 42,
}

// const result1 = NewUserSchema.safeParse(user1)
// if (result1.success) {
// 	alert('User 1: good')
// } else {
// 	result1.error.errors.map((error) => {
// 		console.log(error.message)
// 	})
// }

const Signup: React.FC = () => {
    const { handleSubmit, register } = useForm<iFormInputs>()

    const inputFields = [
        { inputId: 'fullName', label: 'שם מלא:', inputType: 'text', register },
        { inputId: 'id', label: 'ת.ז', inputType: 'number', register },
        { inputId: 'birthDate', label: 'תאריך לידה:', inputType: 'date', register },
        { inputId: 'phoneNumber', label: 'נייד:', inputType: 'number', register },
        { inputId: 'email', label: 'מייל:', inputType: 'email', register },
        { inputId: 'city', label: 'עיר:', inputType: 'text', register },
        { inputId: 'street', label: 'רחוב:', inputType: 'text', register },
        { inputId: 'houseNumber', label: 'מספר בית:', inputType: 'number', register },
    ]
    const sectionTitles: string[] = ['פרטים אישיים:', 'פרטי התקשרות:', 'כתובת:']
    const groupedFields = [inputFields.slice(0, 3), inputFields.slice(3, 5), inputFields.slice(5)]

    const formSubmitHanlder: SubmitHandler<iFormInputs> = (data: iFormInputs) => {
        console.log(typeof data.id)
        const newUser = NewUserSchema.safeParse(data)
        if (newUser.success) {
            alert('User 1: good')
        } else {
            newUser.error.errors.map((error) => {
                console.log(error)
            })
        }
        console.log(newUser)
    }

    return (
        <main className='main-container'>
            <form onSubmit={handleSubmit(formSubmitHanlder)} className='signup-form'>
                <div className='image-container'>
                    <img src='/real-estate.png' />
                </div>
                <div className='form-container'>
                    <header className='form-header'>
                        <span className='header-title'>הרשמה :</span>
                        <span className='header-explanation'>*שדות המסומנים בכוכבית הם שדות חובה</span>
                    </header>
                    <div className='inputs-container'>
                        {groupedFields.map((fields, index) => (
                            <div className='inputs-section' key={index}>
                                <h2>{sectionTitles[index]}</h2>
                                <div className='inputs-row'>
                                    {fields.map((field) => (
                                        <React.Fragment key={field.inputId}>
                                            <Input
                                                {...field}
                                                key={field.inputId}
                                                {...register(field.inputId as keyof iFormInputs, { required: true })}
                                            />
                                            {/* {errors[field.inputId as keyof iFormInputs] && (
												<span className='error'>{errors[field.inputId as keyof iFormInputs]?.message}</span>
											)} */}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='btn-container'>
                        <SubmitButton className={'submit-btn'} buttonText={'שלח'} />
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Signup
