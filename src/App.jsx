import React from "react";
import { Sidebar } from "./components/SideBars";
import { MainBar } from "./components/MainTest/MainBar";
import LandingPage from "./pages/Landing";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login    from './pages/Login'
import TestCreation from "./pages/TestCreate";
import TestAttempt from "./pages/TestAttempt";
import TestExamPage from "./pages/TestExamPage";
import TestDetailsPage from "./pages/TestDetailsPage";
function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<TestCreation />} />
        <Route path="/attempt/:id" element={<TestAttempt />} />
        <Route path="/test/:id" element={<TestDetailsPage />} />
        <Route path="/test-exam/:id" element={<TestExamPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
