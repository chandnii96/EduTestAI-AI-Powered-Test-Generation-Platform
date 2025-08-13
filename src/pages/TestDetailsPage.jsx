import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { saveAs } from 'file-saver';

const TestDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(location.state?.testData || null);
  const [loading, setLoading] = useState(!testData);
  const [attemptData, setAttemptData] = useState(null);

  const fetchTestById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/test/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Token: `${localStorage.getItem("token")}`,
        },
      });

      // Check if user has any existing attempts for this test
      const attemptRes = await axios.get(`http://localhost:5000/api/test/attempt/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Token: `${localStorage.getItem("token")}`,
        },
      }).catch(() => null); // Handle case where no attempt exists

      const existingAttempt = attemptRes?.data;
      let attemptStatus = "not_attempted";

      if (existingAttempt) {
        if (existingAttempt.isCompleted) {
          attemptStatus = "completed";
        } else {
          attemptStatus = "in_progress";
        }
        setAttemptData(existingAttempt);
      }

      const previousStatus = location.state?.testData?.attemptStatus;
      
      setTestData({
        ...res.data,
        attemptStatus: previousStatus || attemptStatus,
      });
    } catch (err) {
      console.error("Failed to fetch test data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!testData) {
      fetchTestById();
    }
  }, []);

  const handleStartTest = () => {
    console.log('Starting/Resuming test with data:', {
      status: testData.attemptStatus,
      attemptId: testData.attemptId,
      testData
    });

    if (testData.attemptStatus === "in_progress") {
      // Resume test
      if (!testData.attemptId) {
        console.error('No attemptId found for in-progress test');
        alert('Error: Could not resume test. Please try starting a new test.');
        return;
      }

      navigate(`/test-exam/${id}`, { 
        state: { 
          testData,
          isResume: true,
          attemptId: testData.attemptId
        } 
      });
    } else {
      // Start new test
      navigate(`/test-exam/${id}`, { 
        state: { 
          testData,
          isResume: false
        } 
      });
    }
  };

  const handleDownloadTest = () => {
    const testContent = `
      Test Title: ${testData.title}
      Status: ${testData.attemptStatus || "Not Started"}
      Created: ${new Date(testData.createdAt).toLocaleDateString()}
      
      Questions (${testData.seriesData.length}):
      
      ${testData.seriesData.map((question, idx) => `
        Q${idx + 1}: ${question.question}
        Options:
        ${Object.entries(question.options).map(([optionKey, optionText]) => 
          `  ${optionKey}. ${optionText}`).join('\n')}
      `).join('\n\n')}
    `;
    
    const blob = new Blob([testContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${testData.title.replace(/\s+/g, '_')}_test.txt`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "in_progress":
        return "text-yellow-400";
      default:
        return "text-blue-400";
    }
  };

  const getButtonText = () => {
    switch (testData.attemptStatus) {
      case "in_progress":
        return "Resume Test";
      case "completed":
        return "View Results";
      default:
        return "Start Test";
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6 flex items-center justify-center">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (!testData) return (
    <div className="min-h-screen bg-gray-900 text-red-400 p-6 flex items-center justify-center">
      No test data found.
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Navbar with dark background */}
      <div className="bg-gray-800 shadow-lg">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8 mt-18">
          <div>
            <h1 className="text-3xl font-bold text-white">{testData.title}</h1>
            <div className="flex space-x-4 mt-2">
              <span className={`bg-gray-800 px-3 py-1 rounded-full text-sm ${getStatusColor(testData.attemptStatus)}`}>
                Status: <span className="capitalize">{testData.attemptStatus?.replace('_', ' ') || "Not Started"}</span>
              </span>
              <span className="bg-gray-800 text-purple-400 px-3 py-1 rounded-full text-sm">
                Created: {new Date(testData.createdAt).toLocaleDateString()}
              </span>
              {attemptData && attemptData.isCompleted && (
                <span className="bg-gray-800 text-green-400 px-3 py-1 rounded-full text-sm">
                  Score: {attemptData.score}/{testData.seriesData.length}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadTest}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-md transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            
            {(testData.attemptStatus === "not_attempted" || testData.attemptStatus === "in_progress") && (
              <button
                onClick={handleStartTest}
                className={`${
                  testData.attemptStatus === "in_progress" 
                    ? "bg-yellow-600 hover:bg-yellow-700" 
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white px-5 py-2 rounded-md transition flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {testData.attemptStatus === "in_progress" ? "Resume Test" : "Start Test"}
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Questions ({testData.seriesData.length})
          </h2>

          <div className="space-y-4">
            {testData.seriesData.map((question, idx) => (
              <div
                key={question.questionId}
                className="bg-gray-800 p-5 rounded-lg border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-lg font-medium mb-3 text-white">
                  <span className="text-blue-400">Q{idx + 1}:</span> {question.question}
                </h3>
                <ul className="pl-2 space-y-2">
                  {Object.entries(question.options).map(
                    ([optionKey, optionText]) => (
                      <li key={optionKey} className="flex items-start">
                        <span className="inline-block bg-gray-700 text-blue-300 rounded-full px-2 py-1 text-xs mr-2">
                          {optionKey}
                        </span>
                        <span className="text-gray-300">{optionText}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetailsPage;