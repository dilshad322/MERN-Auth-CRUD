
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleError = (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 403) {
            toast.error(message || "Email or password is wrong");
        }
        else if (status === 500) {
            toast.error("Server error. Please try again later");
        }
        else if (status === 400) {
            toast.error(message || "Invalid request");
        }
        else {
            toast.error("Unable to connect to server");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {
            email: '',
            password: ''
        };

        let isValid = true;

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            return;
        }
         setLoading(true);
        try {
          
            const response = await axios.post(
                "http://localhost:5000/auth/login",
                form
            );
const {success,message,name,jwtToken}=response.data;
           if(success){
 console.log(response.data);
    setLoading(false);
            localStorage.setItem("token",jwtToken);
                localStorage.setItem("loggedInUser",name);
            toast.success("Login Successfully")
            navigate('/');
           }
        } catch (error) {
            handleError(error);
               setLoading(false);
        }
    };
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                                               {errors.email && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.email}
    </p>
)}
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                     {errors.password && (
    <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
        {errors.password}
    </p>
)}
                                </div>
                                <div className="flex items-center justify-end">
                                   
                                    <Link
                                        to={'/forgot-password'}
                                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                 disabled={loading}
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
{loading ? (
        <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Logging in...
        </>
    ) : (
        "Sign in"
    )}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to={'/signup'}
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login