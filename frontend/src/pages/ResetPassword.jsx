import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: ""
    });
    const { token } = useParams();
    console.log("Reset Token:", token);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setErrors({
                password: "Password is required",
                confirmPassword: ""
            });
            return;
        }

        if (!confirmPassword) {
            setErrors({
                password: "",
                confirmPassword: "Confirm password is required"
            });
            return;
        }

        if (password !== confirmPassword) {
            setErrors({
                password: "",
                confirmPassword: "Passwords do not match"
            });
            return;
        }

        setErrors({
            password: "",
            confirmPassword: ""
        });
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/reset-password",
                {
                    token,
                    password
                }
            );

            if (response.data.success) {
                setLoading(false);
                toast.success(response.data.message || "Your Password Changed Successfully");
                setTimeout(() => {
                    navigate('/login');
                }, 1000)
            }

        } catch (error) {
            console.log(error.response?.data);
            setLoading(false);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Reset Password
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Enter your new password below
                </p>

                <form onSubmit={handleSubmit}>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({
                                    ...errors,
                                    password: ""
                                });

                            }}
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrors({
                                    ...errors,
                                    confirmPassword: ""
                                });

                            }}
                            placeholder="Confirm new password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-[12px] md:text-sm font-medium mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        {loading ? (
                            <>
                                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                Reseting Password...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ResetPassword;
