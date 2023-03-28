import React, { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useStore } from '../../controller/store'
import { Input } from '../components/Input'
import { SubmitButton } from '../components/SubmitButton'
import { NewUserSchema, NewUser } from '../../model/NewUser.model'
import { createUser } from '../../controller/entities/user.actions'

const Signup: React.FC = () => {
    const { handleSubmit, register, reset } = useForm<NewUser>()
    const [userAlert, setUserAlert] = useState<boolean>(false)
    const validInputsCountRef = useRef<number>(0)
    const validInputsListRef = useRef<string[]>([])
    const inputFields = [
        { inputId: 'fullName', label: 'שם מלא', inputType: 'text', register },
        { inputId: 'id', label: 'ת.ז', inputType: 'number', register },
        { inputId: 'birthDate', label: 'תאריך לידה', inputType: 'date', register },
        { inputId: 'phoneNumber', label: 'נייד', inputType: 'number', register },
        { inputId: 'email', label: 'מייל', inputType: 'email', register },
        { inputId: 'city', label: 'עיר', inputType: 'text', register },
        { inputId: 'street', label: 'רחוב', inputType: 'text', register },
        { inputId: 'houseNumber', label: 'מספר בית', inputType: 'number', register },
        { inputId: 'agreeEmail', label: 'אני מסכים לקבל דיוור במייל', inputType: 'checkbox', register },
        { inputId: 'agreeTerms', label: 'אני מסכים לתנאי השירות', inputType: 'checkbox', register },
    ]
    const sectionTitles: string[] = ['פרטים אישיים:', 'פרטי התקשרות:', 'כתובת:']
    const groupedFields = [inputFields.slice(0, 3), inputFields.slice(3, 5), inputFields.slice(5, 8), inputFields.slice(8)]

    const formSubmitHandler: SubmitHandler<NewUser> = async (data: NewUser) => {
        if (validInputsCountRef.current <= 8) {
            setUserAlert(true)
            return
        }
        const newUserResult = await NewUserSchema.parseAsync(data)
        console.log(newUserResult)
        setUserAlert(false)
        createUser(newUserResult)
        const state = useStore.getState()
        console.log('State after:', state)
        reset()
    }

    function countValidInputs(inputId: string) {
        if (validInputsListRef.current.includes(inputId)) return
        validInputsListRef.current.push(inputId)
        validInputsCountRef.current++
    }

    return (
        <main className='main-container'>
            <form onSubmit={handleSubmit(formSubmitHandler)} className='signup-form'>
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
                                                countValidInputs={countValidInputs}
                                                {...register(field.inputId as keyof NewUser)}
                                            />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='btn-container'>
                        <SubmitButton className={`submit-btn`} buttonText={'שלח'} />
                        {userAlert && <span>יש למלא את כל השדות כדי לבצע הרשמה</span>}
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Signup
