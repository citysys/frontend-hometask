import React from 'react'
import './SubmitButton.style.scss'

export interface SubmitButtonProps {
	className: string
	buttonText: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, buttonText }) => {
	return (
		<button type='submit' className={className}>
			{buttonText}
		</button>
	)
}

export default SubmitButton
