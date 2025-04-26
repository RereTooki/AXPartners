import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface DashboardData {
  predictedGrade: number;
  recommendedHours: number;
  resources: { title: string; link: string }[];
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputClick = () => {
    navigate("/input");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Site Title */}
        <h1 className="text-3xl font-bold mb-2">AX Partners Dashboard</h1>
        <p className="text-gray-400 mb-10">
          Welcome to your learning optimization center. Your personalized
          academic assistant. Get your predicted grades, recommended study
          plans, and tailored learning resources — all in one place.
        </p>

        {/* Input Button */}
        <div className="flex justify-between items-center mb-8 sborder-4 ">
          <Link
            to="/resources" // Link to existing Resources Page
            className="text-blue-500 hover:underline transition duration-300"
          >
            Go to Learning Resources
          </Link>
          <button
            onClick={handleInputClick}
            className="bg-white text-neutral-900 font-semibold py-2 px-6 rounded-md hover:bg-gray-200 transition"
          >
            Fill Academic Details
          </button>
        </div>

        {/* Main Dashboard Cards */}
        <div className="space-y-6">
          {/* Predicted Grade Card */}
          <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">🎯 Predicted Grade</h2>
            {data ? (
              <p className="text-3xl font-bold">{data.predictedGrade}/100</p>
            ) : (
              <p className="text-gray-400">Loading grade prediction...</p>
            )}
          </div>

          {/* Recommended Study Hours Card */}
          <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              ⏳ Recommended Study Hours
            </h2>
            {data ? (
              <p className="text-2xl">{data.recommendedHours} hrs/week</p>
            ) : (
              <p className="text-gray-400">Loading study hours...</p>
            )}
          </div>

          {/* Suggested Resources Card */}
          <div className="bg-neutral-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              📚 Suggested Resources
            </h2>
            {data ? (
              <ul className="list-disc list-inside space-y-2">
                {data.resources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Loading resources...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
