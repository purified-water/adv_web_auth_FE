import { useState } from "react";
import api from "../utils/api";
import ErrorNotification from "../components/ErrorNotification";
import SuccessNotification from "../components/SuccessNotification";

export default function RegisterScreen() {
    const [signUpInfo, setSignUpInfo] = useState({
        email: "",
        username: "",
        fullname: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        username: "",
        fullname: "",
        password: "",
        api: ""
    });
    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = { email: "", password: "" };

        if (!signUpInfo.email) newErrors.email = "Email is required";
        else if (!isEmailValid(signUpInfo.email)) 
            newErrors.email = "Please enter a valid email";

        if (!signUpInfo.username) 
            newErrors.username = "Username is required";

        if (!signUpInfo.password) 
            newErrors.password = "Password is required";
        else if (signUpInfo.password.length < 6) 
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password && !newErrors.username) {
            try {
                setLoading(true);
                // Handle registration logic here
                const user = { 
                    email: signUpInfo.email, 
                    username: signUpInfo.username,
                    fullname: signUpInfo.fullname,
                    password: signUpInfo.password, 
                };

                const response = await api.post(`/auth/register`, user);

                if (response.status === 200 || response.status === 201) {
                    // Handle successful registration (e.g., redirect)
                    setErrors((prev) => ({ ...prev, api: "" }));
                    setRegisterSuccess(true);
                    setSignUpInfo({
                        email: "",
                        username: "",
                        fullname: "",
                        password: "",
                    })

                    setTimeout(() => {
                        window.location.href = "/auth/login";
                    }, 3000);
                } else {
                    console.error("Registration failed!", response.data);
                }
            } catch (error) {
                // Handle errors from the API
                if (error.response) {
                    // API responded with an error status
                    setErrors((prev) => ({ ...prev, api: error.response.data.message }));
                } else {
                    // Network error or something else went wrong
                    setErrors((prev) => ({ ...prev, api: "An error occurred. Please try again." }));
                }
            } finally {
                setLoading(false);
            }

        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <h2 className="mb-2 text-2xl font-semibold text-center text-gray-700">Register</h2>
                {errors.api && (
                    <ErrorNotification
                        message={errors.api}
                        onClose={() => setErrors((prev) => ({ ...prev, api: "" }))}
                    />
                )}
                {registerSuccess && (
                    <SuccessNotification
                        message="Registration successful! Redirecting to login..."
                        onClose={() => setRegisterSuccess(false)}
                    />
                )}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            value={signUpInfo.email}
                            onChange={(e) => setSignUpInfo((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring`}
                            onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            value={signUpInfo.username}
                            onChange={(e) => setSignUpInfo((prev) => ({ ...prev, username: e.target.value }))}
                            placeholder="Enter your username"
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.username ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring`}
                            onFocus={() => setErrors((prev) => ({ ...prev, username: "" }))}
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input
                            value={signUpInfo.fullname}
                            onChange={(e) => setSignUpInfo((prev) => ({ ...prev, fullname: e.target.value }))}
                            placeholder="Enter your full name"
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.fullname ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring`}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            value={signUpInfo.password}
                            onChange={(e) => setSignUpInfo((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.password ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring`}
                            onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Register
                    </button>
                    <div className="mt-2">
                        <span className="text-sm text-gray-600">Already have an account? <a href="/auth/login" className="text-blue-500">Login here</a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
