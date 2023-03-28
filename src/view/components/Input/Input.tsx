import React, { useState, forwardRef, ForwardedRef } from 'react'
import { NewUserSchema } from '../../../model'
import { isValidCity, isValidStreet } from '../../../model/validation.service'

type InputProps = {
    inputId: string
    label: string
    inputType: string
    register: any
    countValidInputs: any
}

const Input = forwardRef(({ inputId, label, inputType, register, countValidInputs }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [errorMsg, setErrorMsg] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState(false)

    async function onchange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const inputValue: string | number = target.value
        const inputId: string = target.id

        if (inputId === 'city') {
            const isValid = await isValidCity(inputValue)
            if (isValid) {
                setApiErrorMsg(false)
            } else {
                target.value = ''
                target.style.borderColor = 'red'
                setApiErrorMsg(true)
                return
            }
        } else if (inputId === 'street') {
            const isValid = await isValidStreet(inputValue)
            if (isValid) {
                setApiErrorMsg(false)
            } else {
                target.value = ''
                target.style.borderColor = 'red'
                setApiErrorMsg(true)
                return
            }
        }

        const fieldValidator = NewUserSchema.pick({ [inputId]: true })
        const fieldValidationResult = await fieldValidator.safeParseAsync({ [inputId]: inputValue })
        if (fieldValidationResult.success) {
            setErrorMsg(false)
            countValidInputs(inputId)
            target.style.borderColor = 'lightGreen'
        } else {
            const error = fieldValidationResult.error.flatten()
            setErrorMsg(true)
            target.style.borderColor = 'red'
        }
    }
    return (
        <div className='input-wrapper'>
            <label className='input-label'>
                <span className='asterisk'>*</span>
                {label} :
            </label>
            <input autoComplete='whatever' {...register(inputId)} type={inputType} id={inputId} onBlur={onchange} ref={ref} required />
            {<span className={`user-error ${errorMsg ? 'visible' : ''}`}>{`האם אתה בטוח שהשדה תקין ?`}</span>}
            {<span className={`user-error ${apiErrorMsg ? 'visible' : ''}`}>{`לא מצאנו את ה${label} במאגר הנתונים שלנו`}</span>}
        </div>
    )
})

export default Input
