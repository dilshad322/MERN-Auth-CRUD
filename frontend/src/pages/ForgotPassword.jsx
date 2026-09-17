import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
        setEmailError("Email is required");
        return;
    }
 setLoading(true);
   setEmailError("");
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/forgot-password",
                {
                    email
                }
            );

              if (response.data.success) {
            toast.success("Reset password link sent to your email");
            setEmail("");
             setLoading(false);
        }
        } catch (error) {
            console.log(error.response?.data);
            toast.error(
            error.response?.data?.message ||
            "Something went wrong"
        );
          setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Forgot Password
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Enter your email to receive a password reset link
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-6">

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                 setEmailError("");

                            }}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
 {
              emailError && (
                <p className='text-[12px] text-red-600 font-medium'>{emailError}</p>
              ) 
            }
                    </div>

                    <button
                       disabled={loading}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                       {loading ? (
        <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Sending Reset Link...
        </>
    ) : (
        "Send Reset Link"
    )}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ForgotPassword;