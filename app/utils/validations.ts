import * as yup from 'yup';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;

export const EmailValidation = () => yup
    .string()
    .max(100, 'Email maximum 100 characters')
    .email('Email is not valid')
    .test('email_test', 'Email is not valid', (value) => {
      if (!value) return true;
      return emailRegex.test(value);
    })
    .required();

export const PhoneNumberValidation = () => yup
    .string()
    .test('IsValidPhoneNumber', 'Phone number is not valid', (value) => {
      if (value) {
        return phoneRegex.test(value);
      }
      return true;
    })
    .required();
