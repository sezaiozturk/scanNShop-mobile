import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});

export const signupSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    name: Yup.string().required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required(),
});
