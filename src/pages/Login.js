import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import api from "../utils/api";
import ErrorNotification from "../components/ErrorNotification";
import { jwtDecode } from "jwt-decode";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "", api: "" });
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext); // Get login function from AuthContext
    const navigate = useNavigate(); // Initialize useNavigate for redirection

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
                const response = await api.post(`/auth/login`, user);

                if (response.status === 200 || response.status === 201) {
                    setErrors((prev) => ({ ...prev, api: "" }));
                    setEmail("");
                    setPassword("");

                    // Decode jwt to get id
                    const token = response.data.token;
                    const decoded = jwtDecode(token);

                    // Use login from AuthContext to save token
                    await login(response.data.token, response.data.username, decoded.id);
                    navigate("/"); // Redirect to home
                }
            } catch (error) {
                if (error.response) {
                    setErrors((prev) => ({ ...prev, api: error.response.data.message }));
                } else {
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
                <h2 className="mb-2 text-2xl font-semibold text-center text-gray-700">Login</h2>
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
                        <span className="text-sm text-gray-600">Don't have an account? <a href="/auth/register" className="text-blue-500">Register</a></span>
                    </div>
                </form>
            </div>
        </div>
    );
}
