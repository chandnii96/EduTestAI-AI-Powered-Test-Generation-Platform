import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


export default function Signup() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    setIsSuccess(false);

    try {
      const res = await axios.post("http://localhost:5000/api/login", credentials);
      await new Promise(resolve => setTimeout(resolve, 2000));
    
      // Replace with your actual localStorage calls:
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsSuccess(true);
      setMessage("Login successful! Redirecting to dashboard...");
      
      // Replace with your actual navigation:
      setTimeout(() => { navigate("/"); }, 2000);
      setTimeout(() => {
        console.log("Would redirect to dashboard");
      }, 2000);

    } catch (err) {
      // const errMsg = err.response?.data?.message || "Login failed. Please try again.";
      const errMsg = "Login failed. Please try again.";
      setMessage(errMsg);
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-3xl opacity-35 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-600 to-purple-700 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-25 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Enhanced grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Subtle moving lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Navbar />
      
      <div className="flex min-h-screen">
        {/* Left side - Enhanced heading */}
        <div className="w-1/2 hidden lg:flex items-center justify-end pr-16">
          <div className="text-right space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
              Welcome back to
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                your dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-md ml-auto">
              Sign in to access your personalized experience and continue where you left off.
            </p>
            <div className="flex justify-end space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Secure Login</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-sm">Fast Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Enhanced login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-700/60 rounded-3xl p-8 shadow-2xl relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
            
            <div className="relative">
              <h2 className="text-3xl font-bold mb-2 text-center text-white">
                Sign In
              </h2>
              <p className="text-gray-400 text-center mb-8">Enter your credentials to continue</p>

              {message && (
                <div className={`mb-6 p-4 rounded-2xl text-sm text-center border backdrop-blur-sm ${
                  isSuccess 
                    ? "bg-green-500/20 border-green-500/30 text-green-300" 
                    : "bg-red-500/20 border-red-500/30 text-red-300"
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    {isSuccess ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{message}</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  onFocus={() => setFocusedField("email")} 
                  onBlur={() => setFocusedField("")}
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full px-4 py-4 bg-gray-800/60 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                    focusedField === "email" || credentials.email
                      ? "border-indigo-500 focus:ring-indigo-500/30 bg-gray-800/80 shadow-lg shadow-indigo-500/20"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  required
                />

                {/* Password Field */}
                <input
                  type="password"
                  name="password"
                  onFocus={() => setFocusedField("password")} 
                  onBlur={() => setFocusedField("")}
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full px-4 py-4 bg-gray-800/60 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                    focusedField === "password" || credentials.password
                      ? "border-indigo-500 focus:ring-indigo-500/30 bg-gray-800/80 shadow-lg shadow-indigo-500/20"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  required
                />

                <button
                  onClick={handleLogin}
                  disabled={isLoading || isSuccess}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : isSuccess ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Success!</span>
                      </div>
                    ) : (
                      "Sign In to Continue"
                    )}
                  </div>
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  By signing in, you agree to our{" "}
                  <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}