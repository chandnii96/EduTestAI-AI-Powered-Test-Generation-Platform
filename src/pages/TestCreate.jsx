import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import TestHistorySidebar from "../components/History";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "lucide-react"; // Add this import for the menu icon

export default function TestCreation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true); // Changed to false by default
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const [selectedTest, setSelectedTest] = useState(null);

  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    difficulty: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [testCreated, setTestCreated] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "History",
    "Geography",
    "English",
    "Literature",
    "Economics",
    "Psychology",
    "Philosophy",
    "Political Science",
    "Sociology",
  ];

  const handleTestSelect = async (test) => {
    setSelectedTest({ ...test, testId: test._id });
    setView('details');
    await fetchTestDetails(test._id);
  };

  const difficulties = ["Easy", "Medium", "Hard"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsSuccess(false);

    // Validation
    if (!formData.subject || !formData.title || !formData.difficulty) {
      setMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Authentication required. Please login again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/test/insertTest",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Token: `${token}`,
            },
          }
        );

        const result = response.data;
        console.log(result);
        
       } catch (error) {
        throw new Error("Failed to create test");
      }

      setIsSuccess(true);
      setTestCreated(true);
      setMessage("Test created successfully! You can now start the test.");
    } catch (error) {
      console.error("Error creating test:", error);
      setMessage("Failed to create test. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartTest = () => {
    console.log("Starting test...");
    navigate(`/attempt/${id}`);
  };

  const handleCreateAnother = () => {
    setFormData({ subject: "", title: "", difficulty: "" });
    setTestCreated(false);
    setIsSuccess(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500 via-teal-500 to-blue-500 rounded-full blur-3xl opacity-35 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-600 to-purple-700 rounded-full blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed top-0 left-0 z-40 h-full">
          <TestHistorySidebar
            toggleSidebar={toggleSidebar}
            isOpen={showSidebar}
          />
        </div>
      )}

      {/* Toggle Button (when sidebar is closed) */}
      {!showSidebar && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-20 bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg hover:bg-gray-800/80 transition-all duration-300 z-50 border border-gray-700"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`min-h-screen flex items-center justify-center px-4 py-18 p-4 -mb-10 transition-all duration-300 ${
          showSidebar ? "ml-80" : "ml-0"
        }`}
      >
        <div className="w-full max-w-2xl">
          {!testCreated ? (
            /* Test Creation Form */
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/60 rounded-3xl p-8 shadow-2xl relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>

              <div className="relative">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Create New Test
                  </h1>
                  <p className="text-gray-400">
                    Configure your test parameters and let AI generate questions
                    for you
                  </p>
                </div>

                {message && !isSuccess && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl text-red-300 text-sm text-center backdrop-blur-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{message}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Subject Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Subject *
                    </label>
                    <input
  type="text"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  onFocus={() => setFocusedField("subject")}
  onBlur={() => setFocusedField("")}
  placeholder="Enter subject"
  list="subject-list"
  className={`w-full px-4 py-4 bg-gray-800/60 border rounded-2xl text-white transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm
    ${
      focusedField === "subject" || formData.subject
        ? "border-blue-500 focus:ring-blue-500/30 bg-gray-800/80"
        : "border-gray-600 hover:border-gray-500"
    }`}
  required
/>

<datalist id="subject-list">
  {subjects.map((subject) => (
    <option key={subject} value={subject} />
  ))}
</datalist>
                  </div>

                  {/* Title Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Test Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("title")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Enter test title (e.g., 'Algebra Basics', 'World War II')"
                      className={`w-full px-4 py-4 bg-gray-800/60 border rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${
                        focusedField === "title" || formData.title
                          ? "border-blue-500 focus:ring-blue-500/30 bg-gray-800/80"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                      required
                    />
                  </div>

                  {/* Difficulty Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Difficulty Level *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {difficulties.map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, difficulty: diff })
                          }
                          className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                            formData.difficulty === diff
                              ? "border-blue-500 bg-blue-500/20 text-blue-300"
                              : "border-gray-600 bg-gray-800/40 text-gray-400 hover:border-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Create Test Button */}
                  <button
                    onClick={handleCreateTest}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

                    <div className="relative">
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Generating Test...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <span>Create Test</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>
                    AI will generate questions based on your selected parameters
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/60 rounded-3xl p-8 shadow-2xl relative text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>

              <div className="relative">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-white">
                  Test Created Successfully!
                </h2>

                {message && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl text-green-300 text-sm backdrop-blur-sm">
                    {message}
                  </div>
                )}

                <div className="bg-gray-800/40 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">
                    Test Details:
                  </h3>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex justify-between">
                      <span>Subject:</span>
                      <span className="text-white font-medium">
                        {formData.subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Title:</span>
                      <span className="text-white font-medium">
                        {formData.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span
                        className={`font-medium ${
                          formData.difficulty === "Easy"
                            ? "text-green-400"
                            : formData.difficulty === "Medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {formData.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleStartTest}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5V14m-4-4h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Start Test Now</span>
                    </div>
                  </button>

                  <button
                    onClick={handleCreateAnother}
                    className="w-full py-4 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-2xl transition-all duration-300"
                  >
                    Create Another Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
