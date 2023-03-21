### Sign up
I developed a registration system with React-form-hook and Zod libraries
In order to perform verifications on the form,
As soon as the user fills out the form and forgets or misses to fill in one of the fields, an error note will appear below the field that he has not filled in yet.
In addition, when the user has filled out the form, the form is validated,
If the validation is successful, the form will go into the Zustand state
and the form will reset.
technologically -
Initially the form is set to isFormValid: false
This means that the form has not been validated
After the user has filled out the form and the validation has passed successfully, the console will see isFormValid become true
And it indicates that the authentication was successful and moved to the Zustand state
The identification field has been validated so that if the user has entered an ID that is not according to the Israeli standard, the field will display an appropriate error.
The list of cities was taken from:
             "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=100000"
The design is taken from a Figma customer requirement
The site supports computer resolution and mobile resolution
Link to the live website:
https://signupohad.netlify.app/


<img width="203" alt="catgoryPage1" src="/public/1.png"/>
<br>
<img width="203" alt="catgoryPage1" src="/public/2.png"/>
<br>

<img width="203" alt="catgoryPage1" src="/public/3.png"/>
