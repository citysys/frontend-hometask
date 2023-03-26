import React from 'react'

type InputProps = {
	inputId: string
	label: string
	inputType: string
	register: any
}

const Input: React.FC<InputProps> = ({ inputId, label, inputType, register }: InputProps) => {
	return (
		<div className='input-wrapper'>
			<label className='input-label'>
				<span className='asterisk'>*</span>
				{label}
			</label>
			<input type={inputType} id={inputId} required />
		</div>
	)
}

export default Input
