// contexts/TestContext.js
import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [currentTest, setCurrentTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const navigate = useNavigate();

  const startTest = async (testId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/test/start/${testId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCurrentTest(res.data);
      setTimer(res.data.duration * 60); // convert minutes to seconds
      navigate(`/test-exam/${testId}`);
    } catch (err) {
      console.error('Failed to start test', err);
    }
  };

  const submitAnswer = async (testId, questionId, selectedOption) => {
    try {
      await axios.post(`http://localhost:5000/api/test/submit-answer/${testId}`, {
        questionId,
        selectedOption
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setAnswers([...answers, { questionId, selectedOption }]);
      goToNextQuestion();
    } catch (err) {
      console.error('Failed to submit answer', err);
    }
  };

  const finalSubmit = async (testId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/test/submit/${testId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTestResult(res.data);
      navigate(`/test-result/${testId}`);
    } catch (err) {
      console.error('Failed to final submit', err);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentTest.seriesData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <TestContext.Provider value={{
      currentTest,
      currentQuestionIndex,
      answers,
      timer,
      testResult,
      startTest,
      submitAnswer,
      finalSubmit,
      goToNextQuestion,
      goToPrevQuestion
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);