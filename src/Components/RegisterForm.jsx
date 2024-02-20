import React, {useEffect, useState} from "react";
const RegisterForm = () => {
    const initialValues = {email: "", name: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex_email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const regex_name = /^[a-zA-Z]{8,}$/
        const regex_password = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/
        if(!values.email){
            errors.email = "Email is required!"
        } else if (!regex_email.test(values.email)){
            errors.email = "Required characters from a-z, A-Z, 0-9, +, - and @"
        }
        if(!values.name){
            errors.name = "Name is required!"
        } else if (!regex_name.test(values.name)){
            errors.name = "Required characters from a-z, A-Z, and must be at least 8 characters."
        }
        if(!values.password){
            errors.password = "Password is required!"
        } else if (!regex_password.test(values.password)){
            errors.password = "Required characters from a-z, A-Z, 0-9, special characters and must be at least 8 characters."
        }
        return errors;
    }
    return(
        <section className="relative bg-gray-100 dark:bg-gray-800 h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 space-y-10">
                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto"
                             src="https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg" alt="Not loaded"/>
                        <h3 className="mt-2 text-center text-2xl leading-9 tracking-tight text-gray-900">Sign up to continue</h3>
                    </div>
                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-900">Email
                                    address</label>
                                <div className="mt-2">
                                    <input type="email" id="email" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}
                                           className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <p>{formErrors.email}</p>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-4 text-gray-900">Full
                                    name</label>
                                <div className="mt-2">
                                    <input type="text" id="name" name="name" placeholder="Enter full name" value={formValues.name} onChange={handleChange}
                                           className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <p>{formErrors.name}</p>
                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-4 text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input type="text" id="password" name="password" placeholder="Enter password" value={formValues.password} onChange={handleChange}
                                           className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <p>{formErrors.password}</p>
                            <p className="block text-sm font-medium leading-6 text-gray-900">By signing up, I accept the
                                Company's Terms of Service and acknowledge the Privacy Policy</p>
                            <div>
                                <button type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5">Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-[25%] absolute bottom-0 left-0">
                <img
                    src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.541/trello-left.4f52d13c.svg"/>
            </div>
            <div className="w-[25%] absolute bottom-0 right-0">
                <img
                    src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.541/trello-right.3ee60d6f.svg"/>
            </div>
        </section>
    )
}
export default RegisterForm;