import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TestResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions, testTitle } = location.state || {};

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-6 flex items-center justify-center">
        No results found. Please complete a test first.
      </div>
    );
  }

  const percentage = ((score / totalQuestions) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="bg-gray-800 shadow-lg">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-white mb-6">{testTitle}</h1>
          
          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-500 mb-2">
              {percentage}%
            </div>
            <div className="text-xl text-gray-400">
              Score: {score} out of {totalQuestions}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/create')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage; 