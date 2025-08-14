# EduTestAI — Frontend

The **frontend** of **EduTestAI**, a cutting-edge AI-powered test generation platform built with **React** and **Vite**. This interface enables users to create, attempt, and track quizzes generated via AI seamlessly.

## Key Features

* **Beautiful, responsive UI** designed with Tailwind CSS.
* **JWT-based authentication**, including login and signup flows.
* **AI-powered test creation**: Users generate tests by choosing subject, title, and difficulty.
* **Real-time quiz attempts** with progress tracking and scoring.
* **Test history sidebar** to review previous attempts.

## Tech Stack

| Component        | Technology                |
| ---------------- | ------------------------- |
| Build Tool       | Vite                      |
| UI Framework     | React                     |
| Styling          | Tailwind CSS              |
| Routing          | React Router DOM          |
| State Management | React Hooks + Context API |
| API Requests     | Axios                     |
| Icons            | Lucide React              |


## Setup & Development

1. **Clone this repository**

   ```bash
   git clone https://github.com/chandnii96/EduTestAI-AI-Powered-Test-Generation-Platform.git
   cd EduTestAI-AI-Powered-Test-Generation-Platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file with:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the app**

   ```bash
   npm run dev
   ```

   Launches the app at: `http://localhost:5173`


## Features & Flow

* **Signup / Login**: Secure onboarding with JWT.
* **Test Creation**: Fill out form fields to generate AI-powered quizzes.
* **Take Quiz**: Streamlined experience with question-by-question interaction.
* **Quiz Results**: Displays score and performance.
* **Test History**: View past attempts via sliding sidebar.
