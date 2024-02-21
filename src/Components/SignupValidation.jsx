import * as Yup from 'yup'

export const signupValidation = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please enter email"),
    username: Yup.string().min(6).required("Please enter username"),
    name: Yup.string().min(8).required("Please enter name"),
    password: Yup.string().min(8).required("Please enter password")
})