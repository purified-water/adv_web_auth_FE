import { useState } from "react";
import api from "../utils/api";
import ErrorNotification from "../components/ErrorNotification";
import SuccessNotification from "../components/SuccessNotification";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "", api: "" });
    const [loading, setLoading] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = { email: "", password: "" };

        if (!email) newErrors.email = "Email is required";
        else if (!isEmailValid(email)) newErrors.email = "Please enter a valid email";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            try {
                setLoading(true);
                // Handle registration logic here
                const user = { email, password, createdAt: new Date() };

                const response = await api.post(`/user/register`, user);

                if (response.status === 200 || response.status === 201) {
                    console.log("Registration successful!", response.data);
                    // Handle successful registration (e.g., redirect)
                    setErrors((prev) => ({ ...prev, api: "" }));                    
                    setRegisterSuccess(true);
                    setEmail("");
                    setPassword("");

                    setTimeout(() => {
                        window.location.href = "/user/login";
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
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">Register</h2>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring`}
                            onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <text className="text-sm text-gray-600">Already have an account? <a href="/user/login" className="text-blue-500">Login here</a>
                        </text>
                    </div>
                </form>
            </div>
        </div>
    );
}
