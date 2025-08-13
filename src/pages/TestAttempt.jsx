// pages/TestAttempt.jsx
import { useParams } from 'react-router-dom';
import { useTest } from '../../contexts/TestContext';
import { useState, useEffect } from 'react';

const TestAttempt = () => {
  const { id: testId } = useParams();
  const {
    currentTest,
    currentQuestionIndex,
    answers,
    timer,
    isLoading,
    error,
    submitAnswer,
    finalSubmit,
    goToNextQuestion,
    goToPrevQuestion,
    setCurrentQuestionIndex
  } = useTest();

  const [selectedOption, setSelectedOption] = useState('');
  const currentQuestion = currentTest?.seriesData[currentQuestionIndex];

  useEffect(() => {
    // Reset selected option when question changes
    setSelectedOption('');
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAnswerSubmit = async () => {
    if (!selectedOption) return;
    
    await submitAnswer(testId, currentQuestion.questionId, selectedOption);
    
    // Auto-advance to next question unless it's the last one
    if (currentQuestionIndex < currentTest.seriesData.length - 1) {
      goToNextQuestion();
    }
  };

  const handleTestSubmit = async () => {
    if (!selectedOption) return;
    await finalSubmit(testId);
  };

  if (!currentTest) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-white">Loading test...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with timer and progress */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{currentTest.title}</h2>
          <div className="bg-gray-800 text-red-400 px-4 py-2 rounded-md">
            Time: {timer}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestionIndex + 1} of {currentTest.seriesData.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / currentTest.seriesData.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / currentTest.seriesData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium mb-4 text-white">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <div
                key={key}
                className={`p-4 rounded-md cursor-pointer transition ${selectedOption === key ? 'bg-blue-900 border border-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => handleOptionSelect(key)}
              >
                <div className="flex items-center">
                  <span className={`inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full ${selectedOption === key ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                    {key}
                  </span>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={goToPrevQuestion}
            disabled={currentQuestionIndex === 0 || isLoading}
            className={`px-6 py-2 rounded-md ${currentQuestionIndex === 0 || isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Previous
          </button>

          {currentQuestionIndex < currentTest.seriesData.length - 1 ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={!selectedOption || isLoading}
              className={`px-6 py-2 rounded-md ${!selectedOption || isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isLoading ? 'Submitting...' : 'Next Question'}
            </button>
          ) : (
            <button
              onClick={handleTestSubmit}
              disabled={!selectedOption || isLoading}
              className={`px-6 py-2 rounded-md ${!selectedOption || isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isLoading ? 'Submitting...' : 'Submit Test'}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900 text-red-200 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAttempt;