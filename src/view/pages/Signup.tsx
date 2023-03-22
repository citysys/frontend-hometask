import './Signup.style.scss';
import realEstate from '../../assets/real-estate.png';
import { MainHeader } from '../components/MainHeader';
import { SubHeader } from '../components/SubHeader';
import { Input } from '../components/Input';
import { Checkboxes } from '../components/Checkboxes';
import { SubmitButton } from '../components/SubmitButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewUserSchema, FormData } from '../../model';
import { useStore } from '../../controller';
import { useState, useEffect } from 'react';
import { Select } from '../components/Select';
import { cities } from '../../utils/getCities';
import { getAddresses, addresses } from '../../utils/getAddresses';

const Signup: React.FC = () => {
  const [fetchedCities, setFetchedCities] = useState([]);
  const [chosenCity, setChosenCity] = useState('');

  getAddresses();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(NewUserSchema),
  });

  const { addUser } = useStore();

  const submitUserData = (data: FormData) => {
    addUser(data);
    alert('User added to global state!');
  };

  useEffect(() => {
    setFetchedCities(cities);
  }, [cities]);

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <div className='signup'>
      <form className='form' onSubmit={handleSubmit(submitUserData)}>
        <MainHeader value='הרשמה :' />
        <SubHeader value='פרטים אישיים:' />
        <div className='inputs-wrapper'>
          <Input
            className='input-container'
            type='text'
            label='שם מלא:'
            mandatory={true}
            registeredValue='fullName'
            register={register}
            error={errors.fullName && 'שם מלא חייב להכיל לפחות 5 אותיות'}
          />
          <Input
            className='input-container'
            type='text'
            label='ת.ז'
            mandatory={true}
            registeredValue='userId'
            register={register}
            error={errors.userId && 'נא להקיש ת.ז מלאה (כולל ספרת ביקורת)'}
          />
          <Input
            className='input-container last-input-container'
            type='date'
            label='תאריך לידה:'
            mandatory={true}
            registeredValue='birthDate'
            register={register}
            error={errors.birthDate && 'נא להזין תאריך לידה תקין'}
          />
        </div>
        <SubHeader value='פרטי התקשרות:' />
        <div className='inputs-wrapper'>
          <Input
            className='input-container'
            type='text'
            label='נייד:'
            mandatory={true}
            registeredValue='phone'
            register={register}
            error={errors.phone && 'נא להזין מספר נייד תקין'}
          />
          <Input
            className='input-container'
            type='email'
            label='מייל:'
            mandatory={true}
            registeredValue='email'
            register={register}
            error={errors.email && 'נא להזין כתובת מייל תקינה'}
          />
        </div>
        <SubHeader value='כתובת:' />
        <div className='inputs-wrapper'>
          <Select
            className='select-container'
            label='עיר:'
            mandatory={true}
            registeredValue='city'
            register={register}
            error={errors.city && 'נא להזין עיר תקינה'}
            options={cities}
            onChange={(e: any) => {
              setChosenCity(e.target.value);
            }}
          />

          <Select
            className='select-container'
            label='רחוב:'
            mandatory={true}
            registeredValue='street'
            register={register}
            error={errors.street && 'נא להזין רחוב תקין'}
            onChange={null}
            options={addresses[chosenCity]}
          />
          <Input
            className='input-container last-input-container small-input-container'
            type='text'
            label="מס' בית:"
            mandatory={true}
            registeredValue='houseNumber'
            register={register}
            error={errors.houseNumber && "נא להזין מס' בית תקין"}
          />
        </div>
        <Checkboxes />
        <SubmitButton className='submit-button' />
      </form>
      <img src={realEstate} alt='' className='signup-form-image' />
    </div>
  );
};

export default Signup;
