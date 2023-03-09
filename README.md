# Front End Home Task

## Figma Design

The Figma design can be accessed via this [Link](https://www.figma.com/file/7L6pEMRGbgdbh6JVgKV4No/Untitled?node-id=11%3A1059&t=3QqyBjJdF3QYhT2j-0)

## Setup

To get started with the project, please follow these steps:

- Fork the repository to your Github account
- Run the command `npm i` in your terminal
- Run the command `npm run dev` to start the development server

## Requirements

**Technical Requirements**

- Use TypeScript & SCSS
- For form validation, use react-hook-form + zod
- Follow the initial file structure provided
- Write readable code
- Create reusable components that are scalable for other services
- Show errors to the user in a user-friendly way (e.g. a red border around the field) and in Hebrew.
- When user is hitting submit, the form should be validated and if there are no errors, the form should be submitted to a global state (Zustand)

**Features:**
To complete this project, the form must include the following features:

- Validate the user's ID according to the Israeli identification standard
- Use the gov.il site to populate the 'city' and 'street' fields. The street is dependent on the chosen city of the gov.il code.
- The user cannot insert a value that is not in the array that has come from the API (for 'street' & city)

## Submission

After completing the project, please submit it by creating a pull request to our repository.

Thank you and good luck!
