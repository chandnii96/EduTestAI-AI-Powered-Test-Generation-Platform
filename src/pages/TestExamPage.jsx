import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const TestExamPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(location.state?.testData || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [attemptId, setAttemptId] = useState(location.state?.attemptId || null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isResume, setIsResume] = useState(location.state?.isResume || false);

  useEffect(() => {
    const initializeTest = async () => {
      try {
        console.log('Initializing test with:', { isResume, attemptId, testData });
        
        if (isResume && attemptId) {
          console.log('Attempting to resume test with attemptId:', attemptId);
          // Resume existing test
          const response = await axios.get(
            `http://localhost:5000/api/test/resume/${attemptId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Token: localStorage.getItem('token'),
              },
            }
          );
          
          console.log('Resume response:', response.data);
          
          if (response.data) {
            setAnswers(response.data.answers || []);
            // Find the first unanswered question or stay at first if all answered
            const lastAnsweredIndex = response.data.answers?.length - 1 || 0;
            setCurrentQuestionIndex(Math.min(lastAnsweredIndex, testData.seriesData.length - 1));
          } else {
            throw new Error('No data received from resume endpoint');
          }
        } else if (!attemptId) {
          console.log('Starting new test');
          // Start new test only if no attemptId provided
          const response = await axios.post(
            'http://localhost:5000/api/test/start',
            { testId: testData._id },
            {
              headers: {
                'Content-Type': 'application/json',
                Token: localStorage.getItem('token'),
              },
            }
          );
          console.log('Start test response:', response.data);
          setAttemptId(response.data.attemptId);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize test:', err);
        setError(err.response?.data?.message || 'Failed to initialize test');
        setLoading(false);
      }
    };

    if (testData) {
      initializeTest();
    } else {
      console.error('No test data found in location state:', location.state);
      setError('No test data found');
      setLoading(false);
    }
  }, [testData, isResume, attemptId]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption || !attemptId) return;

    try {
      const response = await axios.post(
        'http://localhost:/api/test/submit',
        {
          attemptId,
          questionId: testData.seriesData[currentQuestionIndex].questionId,
          selectedOption,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: localStorage.getItem('token'),
          },
        }
      );

      // Update answers state
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = {
        questionId: testData.seriesData[currentQuestionIndex].questionId,
        selectedOption,
        isCorrect: response.data.isCorrect
      };
      setAnswers(newAnswers);

      // Check if test is completed
      if (response.data.isCompleted) {
        // Navigate directly to results with the score from submit response
        navigate('/test-results', { 
          state: { 
            score: response.data.score || newAnswers.filter(a => a?.isCorrect).length,
            totalQuestions: testData.seriesData.length,
            testTitle: testData.title
          } 
        });
      } else if (currentQuestionIndex < testData.seriesData.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption('');
      } else {
        // This is the last question but test isn't auto-completed
        // Call final submit
        try {
          const finalResponse = await axios.post(
            'http://localhost:5000/api/test/final',
            { attemptId },
            {
              headers: {
                'Content-Type': 'application/json',
                Token: localStorage.getItem('token'),
              },
            }
          );

          navigate('/test-results', { 
            state: { 
              score: finalResponse.data.score,
              totalQuestions: testData.seriesData.length,
              testTitle: testData.title
            } 
          });
        } catch (finalErr) {
          if (finalErr.response?.data?.alreadyCompleted) {
            // Test was already completed, navigate with existing score
            navigate('/test-results', { 
              state: { 
                score: finalErr.response.data.score,
                totalQuestions: testData.seriesData.length,
                testTitle: testData.title
              } 
            });
          } else {
            setError('Failed to submit final answer');
          }
        }
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
      setError('Failed to submit answer');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Load the previously selected answer for this question
      const previousAnswer = answers[currentQuestionIndex - 1];
      setSelectedOption(previousAnswer?.selectedOption || '');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < testData.seriesData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Load the previously selected answer for this question if it exists
      const nextAnswer = answers[currentQuestionIndex + 1];
      setSelectedOption(nextAnswer?.selectedOption || '');
    }
  };

  // Load selected option when question changes
  useEffect(() => {
    const currentAnswer = answers[currentQuestionIndex];
    setSelectedOption(currentAnswer?.selectedOption || '');
  }, [currentQuestionIndex, answers]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-300 p-6 flex items-center justify-center">
        <div className="animate-pulse">Loading test...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!testData || !testData.seriesData || testData.seriesData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Invalid test data</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = testData.seriesData[currentQuestionIndex];
  const answeredCount = answers.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="bg-gray-800 shadow-lg">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">{testData.title}</h1>
          <div className="flex justify-between items-center">
            <span className="text-blue-400">
              Question {currentQuestionIndex + 1} of {testData.seriesData.length}
            </span>
            <span className="text-purple-400">
              Answered: {answeredCount}/{testData.seriesData.length}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / testData.seriesData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {Object.entries(currentQuestion.options).map(([optionKey, optionText]) => (
              <button
                key={optionKey}
                onClick={() => handleOptionSelect(optionKey)}
                className={`w-full text-left p-4 rounded-lg transition ${
                  selectedOption === optionKey
                    ? 'bg-blue-600 text-white border-2 border-blue-400'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-2 border-transparent'
                }`}
              >
                <span className="font-medium mr-2">{optionKey}.</span>
                {optionText}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-700 text-gray-300 px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {currentQuestionIndex < testData.seriesData.length - 1 && (
              <button
                onClick={handleNext}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Skip
              </button>
            )}
            
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
            >
              {currentQuestionIndex === testData.seriesData.length - 1
                ? 'Submit Test'
                : 'Submit & Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExamPage;