import React, { useState } from 'react'

type InputProps = {
    inputId: string
    label: string
    inputType: string
    register: any
}

const Input: React.FC<InputProps> = ({ inputId, label, inputType, register }: InputProps) => {
    const [errorMsg, setErrorMsg] = useState(false)
    return (
        <div className='input-wrapper'>
            <label className='input-label'>
                <span className='asterisk'>*</span>
                {label}
            </label>
            {errorMsg && <span>שים לב זהו שדה חובה</span>}
            <input {...register(inputId)} type={inputType} id={inputId} />
        </div>
    )
}

export default Input
