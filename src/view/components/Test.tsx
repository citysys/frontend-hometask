import {useEffect} from 'react';
import { useStore } from '../../controller';

// If everything is set up correctly, when the user submits the form with valid details, the setFormValid function from the Zustand store will be called with the value true.
function SomeOtherComponent() {
  const { isFormValid } = useStore();

  useEffect(() => {
    console.log('isFormValid:', isFormValid);
  }, [isFormValid]);
// When the form is submitted with valid details, the isFormValid value in this component should be true, and you should see a console log with the message "isFormValid: true".

  return <div></div>;
}

export default SomeOtherComponent;