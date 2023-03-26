import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { SubmitButton } from '../components/SubmitButton'

type FormData = {
	fullName: string
	id: number
	birthDate: string
	phoneNumber: number
	email: string
	city: string
	street: string
	houseNumber: number
}

const Signup: React.FC = () => {
	const { handleSubmit, register } = useForm<FormData>()
	const onSubmit = (data: FormData) => console.log(data)

	const inputFields = [
		{ inputId: 'fullName', label: 'שם מלא:', inputType: 'text', register },
		{ inputId: 'id', label: 'ת.ז', inputType: 'text', register },
		{ inputId: 'birthDate', label: 'תאריך לידה:', inputType: 'date', register },
		{ inputId: 'phoneNumber', label: 'נייד:', inputType: 'text', register },
		{ inputId: 'email', label: 'מייל:', inputType: 'email', register },
		{ inputId: 'city', label: 'עיר:', inputType: 'text', register },
		{ inputId: 'street', label: 'רחוב:', inputType: 'text', register },
		{ inputId: 'houseNumber', label: 'מספר בית:', inputType: 'text', register },
	]
	const sectionTitles = ['פרטים אישיים:', 'פרטי התקשרות:', 'כתובת:']
	const groupedFields = [inputFields.slice(0, 3), inputFields.slice(3, 5), inputFields.slice(5)]

	return (
		<main className='main-container'>
			<form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
				<div className='image-container'>
					<img src='../../../public/real-estate.png' />
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
										<Input key={field.inputId} {...field} />
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
