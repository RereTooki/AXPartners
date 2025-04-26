import { createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import InputForm from "./components/InputForm";
import ResultsPage from "./components/ResultsPage";
import ResourcesPage from "./components/ResourcesPage";

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
    element: <ResourcesPage />,
  },

  // {
  //   path: "/services", // services Page
  //   element: <Page3 />,
  // },
  // {
  //   path: "/contactUs", // contact Page
  //   element: <Page4 />,
  // },
  // {
  //   path: "/contactUs/#bookings", // bookings section
  //   element: <BodyIntro4 />,
  // },
]);

export default router;
