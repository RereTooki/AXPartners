import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import InputForm from "./components/InputForm";
import ResultsPage from "./components/ResultsPage";
import LearningResources from "./components/LearningResources";
import Profile from "./components/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/input",
    element: (
      <PrivateRoute>
        <InputForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/results",
    element: (
      <PrivateRoute>
        <ResultsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/resources", // If this is public, leave it as-is
    element: <LearningResources />,
  },
]);

export default router;
