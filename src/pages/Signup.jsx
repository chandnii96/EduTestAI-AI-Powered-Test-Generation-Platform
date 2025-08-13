import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      setMessage(response.data.message || "Account created successfully!");
      setFormData({ name: "", email: "", password: "" });

      setMessage("sign up successful! Redirecting to LogIn...");

      
      // Replace with your actual navigation:
      setTimeout(() => { navigate("/login"); }, 2000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Signup failed. Please try again.";
      setMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-80">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Navigation */}
      <Navbar />
      <div className="flex min-h-screen">
        {/* Right side - Heading */}
        <div className="w-1/2 hidden lg:flex items-center justify-end pr-12">
          <div className="text-right">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
              Join the future of
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Online Test
              </span>
            </h1>
          </div>
        </div>

        {/* Left side - Signup Form Centered */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Create your account
            </h2>

            {message && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center">
                {message}
              </div>
            )}

            {/* Your Input Fields and Button */}
            <div className="space-y-6">
              {/* Name Field */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  focusedField === "name" || formData.name
                    ? "border-blue-500 focus:ring-blue-500/20 bg-gray-800/70"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                required
              />

              {/* Email Field */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  focusedField === "email" || formData.email
                    ? "border-blue-500 focus:ring-blue-500/20 bg-gray-800/70"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                required
              />

              {/* Password Field */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  focusedField === "password" || formData.password
                    ? "border-blue-500 focus:ring-blue-500/20 bg-gray-800/70"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                required
              />

              <button
                onClick={handleSubmit}
                
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Get started for free"
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium" onClick={()=>navigate('/login')}>
                  Sign in
                </button>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
