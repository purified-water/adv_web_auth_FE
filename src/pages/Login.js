import { useState } from "react";
import api from "../utils/api";
import ErrorNotification from "../components/ErrorNotification";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "", api: "" });
    const [loading, setLoading] = useState(false);

    const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = { email: "", password: "", api: "" };

        if (!email) newErrors.email = "Email is required";
        else if (!isEmailValid(email)) newErrors.email = "Please enter a valid email";

        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            setLoading(true);
            try {
                const user = { email, password };
                const response = await api.post(`/user/login`, user);
                // Handle successful login (e.g., save token, redirect)
                if (response.status === 200 || response.status === 201) {
                    setErrors((prev) => ({ ...prev, api: "" }));
                    setEmail("");
                    setPassword("");
                    localStorage.setItem("token", response.data.token);
                    window.location.href = "/";
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
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">Login</h2>
                {errors.api && (
                    <ErrorNotification
                        message={errors.api}
                        onClose={() => setErrors((prev) => ({ ...prev, api: "" }))}
                    />
                )}

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring`}
                            onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 mt-1 text-gray-700 border rounded ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring`}
                            onFocus={() => setErrors((prev) => ({ ...prev, password: "" }))}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div className="mt-2">
                        <span className="text-sm text-gray-600">Don't have an account? <a href="/user/register" className="text-blue-500">Register</a></span>
                    </div>
                </form>
            </div>
        </div>
    );
}
