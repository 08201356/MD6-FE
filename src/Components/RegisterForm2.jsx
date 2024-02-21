import React from "react";
import {Field, Form, Formik} from "formik";
import {signupValidation} from "./SignupValidation";
const initialValues ={
    email: "",
    username: "",
    name: "",
    password:""
}
function handleSubmit() {
    alert("Login in successfully!!!");
}
function RegisterForm2(){
    return (
        <section className="relative bg-gray-100 dark:bg-gray-800 h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 space-y-10">
                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto"
                             src="https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg" alt="Not loaded"/>
                        <h3 className="mt-2 text-center text-2xl leading-9 tracking-tight text-gray-900">Sign up to
                            continue</h3>
                    </div>
                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Formik initialValues={initialValues} validationSchema={signupValidation} onSubmit={handleSubmit}>
                            {({errors}) => (
                                <Form>
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-4 text-gray-900">Email
                                            address</label>
                                        <div className="mt-2">
                                            <Field type="email" id="email" name="email" placeholder="Enter email"
                                                   className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <p>{errors.email}</p>
                                    <div>
                                        <label htmlFor="username"
                                               className="block text-sm font-medium leading-4 text-gray-900">Username</label>
                                        <div className="mt-2">
                                            <Field type="text" id="username" name="username" placeholder="Enter username"
                                                   className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <p>{errors.username}</p>
                                    <div>
                                        <label htmlFor="name"
                                               className="block text-sm font-medium leading-4 text-gray-900">Full
                                            name</label>
                                        <div className="mt-2">
                                            <Field type="text" id="name" name="name" placeholder="Enter full name"
                                                   className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <p>{errors.name}</p>
                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-4 text-gray-900">Password</label>
                                        <div className="mt-2">
                                            <Field type="text" id="password" name="password"
                                                   placeholder="Enter password"
                                                   className="block w-full border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                        </div>
                                    </div>
                                    <p>{errors.password}</p>
                                    <p className="block text-sm font-medium leading-6 text-gray-900">By signing up, I
                                        accept the
                                        Company's Terms of Service and acknowledge the Privacy Policy</p>
                                    <div>
                                        <button type="submit"
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5">Continue
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
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

export default RegisterForm2