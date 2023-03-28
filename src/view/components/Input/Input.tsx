import React, { useState, forwardRef, ForwardedRef } from 'react'
import { NewUser, NewUserSchema } from '../../../model'
import { isValidCity, isValidStreet } from '../../../model/validation.service'
import { UseFormRegister } from 'react-hook-form'

interface iInputProps {
    index: number
    inputId: string
    label: string
    inputType: string
    register: UseFormRegister<NewUser>
    countValidInputs: (inputId: string) => void
}

const Input = forwardRef(({ index, inputId, label, inputType, register, countValidInputs }: iInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [errorMsg, setErrorMsg] = useState<boolean>(false)
    const [apiErrorMsg, setApiErrorMsg] = useState<boolean>(false)

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
        <div className={`input-wrapper ${inputId}`}>
            <label className='input-label'>
                <span className='asterisk'>*</span>
                {label}
                {inputId !== 'agreeEmail' && inputId !== 'agreeTerms' && ':'}
            </label>
            <input
                autoComplete='whatever'
                {...register(inputId as keyof NewUser)}
                type={inputType}
                id={inputId}
                onBlur={onchange}
                ref={ref}
                required
            />
            {inputId !== 'street' && inputId !== 'city' && inputId !== 'agreeEmail' && inputId !== 'agreeTerms' && (
                <span className={`user-error ${errorMsg ? 'visible' : ''}`}>{`האם אתה בטוח שהשדה תקין ?`}</span>
            )}

            {(inputId === 'street' || inputId === 'city') && (
                <span className={`user-error ${apiErrorMsg ? 'visible' : ''}`}>{`לא מצאנו את ה${label} במאגר הנתונים שלנו`}</span>
            )}
        </div>
    )
})

export default Input
