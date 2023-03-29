import React, { useState, useEffect, Key } from 'react';
import logo from '../../images/realestate.png';
import Select from 'react-select';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/Input';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import { NewUser, NewUserSchema, validateForm } from '../../model';
import { useStore } from '../../controller';
import { OptionType, useCities, useStreets } from '../../vendor/api/api';

const Signup: React.FC = () => {
  const { setFormValid, saveUser } = useStore();

  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<OptionType | null>(null);

  const cities = useCities();
  const streets = useStreets(selectedCity);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<NewUser>({
    resolver: zodResolver(NewUserSchema),
  });

  const handleCityChange = (option: OptionType | null) => {
    setSelectedCity(option);
    setSelectedStreet(null);
  };

  const handleStreetChange = (option: OptionType | null) => {
    setSelectedStreet(option);
  };
  const handleReset = () => {
    reset();
  };

  const onFormSubmit = (data: NewUser) => {
    if (isValid) {
      setFormValid(true);
      console.log(data);
      handleReset();
      saveUser(data);
    }
  };

  return (
    <div className='signup'>
      <div className='signup__title-container'>
        <h1 className='signup__title'>הרשמה:</h1>
        {/* <p className='signup__mandatory'>
          *שדות המסומנים בכוכבית הם שדות חובה{' '}
        </p> */}
      </div>

      <div className='signup__form-container'>
        <form
          className='singup__form'
          onSubmit={handleSubmit(onFormSubmit)}
          action='/submit-form'
          method='post'
        >
          <div className='title__input__container'>
            <p className='signup__form-section-title'>פרטים אישיים: </p>
            <p className='signup__splitter'></p>
          </div>
          <div className='input__container'>
            <Input
              label='שם מלא:'
              inputProps={{
                ...register('name'),
              }}
              className='signup__form-input'
              PlaceholderClassName='signup__form-name'
              error={errors?.name?.message as string}
            />
            <Input
              className='signup__form-input'
              label='ת.ז:'
              PlaceholderClassName='signup__form-name'
              inputProps={register('id')}
              error={errors?.id?.message}
              type='text'
            />
            <Input
              type='date'
              className='signup__form-input signup__form-input-date'
              label='תאריך לידה:'
              PlaceholderClassName='signup__form-name signup__form-birthday'
              id='date-input'
              inputProps={register('dateOfBirth')}
              error={errors?.dateOfBirth?.message}
            />
          </div>

          <div className='title__input__container'>
            <p className='signup__form-section-title'>פרטי תקשורת: </p>
            <p className='signup__splitter'></p>
          </div>

          <div className='input__container'>
            <Input
              className='signup__form-input'
              label='נייד:'
              inputProps={register('phone')}
              PlaceholderClassName='signup__form-name'
              error={errors?.phone?.message}
            />
            <Input
              className='signup__form-input'
              label='מייל:'
              inputProps={register('email')}
              PlaceholderClassName='signup__form-name'
              error={errors?.email?.message}
            />
          </div>
          <div className='title__input__container'>
            <p className='signup__form-section-title'>כתובת: </p>
            <p className='signup__splitter'></p>
          </div>
          <div className='input__container'>
            <div className='signup__form-section'>
              <p className='signup__form-name'>עיר:</p>
              <Select
                id='city'
                options={cities}
                value={selectedCity}
                onChange={handleCityChange}
                className='signup__form-input'
                placeholder=''
              />
            </div>
            <div className='signup__form-section'>
              <p className='signup__form-name'>רחוב:</p>
              <Select
                className='signup__form-input'
                id='street'
                options={streets}
                value={selectedStreet}
                onChange={handleStreetChange}
                isDisabled={!selectedCity}
                placeholder=''
              />
            </div>

            <div className='signup__form-section'>
              <Input
                className='signup__form-input signup__form-input-house'
                label='מספר בית:'
                PlaceholderClassName='signup__form-name signup__form-house'
                type='number'
                id='street'
                error={errors?.homeNumber?.message}
              />
            </div>
          </div>
          <div>
            <div className='checkbox'>
              <div className='mui-checkbox'>
                <input id='sed' type='checkbox' value='' />
                <label htmlFor='sed'>אני מסכים לקבל דיוור במסרון ובמייל</label>
              </div>

              <div>
                <div className='mui-checkbox'>
                  <input id='agree' type='checkbox' value='' />
                  <label htmlFor='agree'>אני מסכים לתנאי השירות </label>
                </div>
              </div>
            </div>
            <SubmitButton
              containerClassName='button-container'
              className='signup__form-button'
              value='שלח'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
