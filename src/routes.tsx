import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import InputForm from "./components/InputForm";
import ResultsPage from "./components/ResultsPage";
import LearningResources from "./components/LearningResources";

const router = createBrowserRouter([
  {
    path: "/", // Root Route
    element: <Homepage />,
  },
  {
    path: "/dashboard", // Public Route
    element: <Dashboard />,
  },
  {
    path: "/input", // Public Route
    element: <InputForm />,
  },
  {
    path: "/results", // Public Route
    element: <ResultsPage />,
  },
  {
    path: "/resources", // Public Route
    element: <LearningResources />,
  },
]);

export default router;
