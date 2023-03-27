import React, { useState } from 'react'
import { NewUserSchema } from '../../../model'

type InputProps = {
    inputId: string
    label: string
    inputType: string
    register: any
    countValidInputs: any
}

const Input: React.FC<InputProps> = ({ inputId, label, inputType, register, countValidInputs }: InputProps) => {
    const [errorMsg, setErrorMsg] = useState(false)

    function onchange({ target }: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = target.value
        const inputId = target.id
        const fieldValidator = NewUserSchema.pick({ [inputId]: true })
        const fieldValidationResult = fieldValidator.safeParse({ [inputId]: inputValue })
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
                {label}
            </label>
            <input {...register(inputId)} type={inputType} id={inputId} onBlur={onchange} />
            {<span className={`user-error ${errorMsg ? 'visible' : ''}`}>{`האם אתה בטוח שהשדה תקין ?`}</span>}
        </div>
    )
}

export default Input
