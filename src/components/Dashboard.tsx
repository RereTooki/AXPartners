import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface Resource {
  title: string;
  link: string;
}

interface DashboardResponse {
  user_id: number;
  name: string;
  courses: {
    course_name: string;
    predicted_grade: number;
    weekly_study_hours: number;
    resources: {
      textbooks: string[];
      videos: string[];
      publishers: string[];
    };
    advice: string;
  }[];
  overall_stats: {
    average_predicted_grade?: number;
    total_weekly_study_hours?: number;
    number_of_courses?: number;
    performance_trend?: string;
    recommendedHours?: number;
    resources?: Resource[];
  };
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        console.log("Fetching dashboard for user:", userId);
        if (!userId) {
          navigate("/auth");
          return;
        }

        const response = await axios.get<DashboardResponse>(
          `http://localhost:8000/users/${userId}/dashboard`
        );

        setData(response.data);
        console.log("Dashboard API data:", response.data);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setData(null);
        } else {
          console.error("Dashboard fetch failed:", err);
          setError("Failed to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleInputClick = () => {
    navigate("/input");
  };

  const handleViewResults = () => {
    navigate("/results");
  };
  const handleCoursesClick = () => navigate("/courses");

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl lg:text-5xl text-center font-bold mb-8 lg:mb-12">
          AX Partners Dashboard
        </h1>
        <p className="text-gray-400 mb-10">
          Welcome to your learning optimization center.
        </p>

        <div className="flex justify-between items-center mb-8">
          <Link
            to="/resources"
            className="text-[#94d8df] hover:underline hover:scale-[1.04] transition duration-300"
          >
            Go to Learning Resources
          </Link>
          <button
            onClick={handleInputClick}
            className="bg-white text-neutral-900 font-semibold py-2 px-6 rounded-md hover:bg-[#94d8df] hover:text-white hover:scale-105 transition duration-300"
          >
            Fill Academic Details
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading dashboard...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : data === null ||
          data.overall_stats?.average_predicted_grade === undefined ? (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold mb-4">
              Welcome{data?.name ? `, ${data.name}` : ""}! 👋
            </h2>
            <p className="text-gray-400 mb-6">
              To get started with your performance predictions, please fill in a
              few quick details.
            </p>
            <button
              onClick={handleInputClick}
              className="bg-[#94d8df] text-white py-2 px-6 rounded-md font-semibold hover:bg-white hover:text-neutral-900 transition"
            >
              Go to Input Page
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="🎯 Avg Predicted Grade"
                value={`${data.overall_stats.average_predicted_grade}/100`}
              />
              <StatCard
                title="⏳ Total Study Hours"
                value={`${
                  data.overall_stats.total_weekly_study_hours ?? "N/A"
                } hrs/week`}
              />
              <div onClick={handleCoursesClick}>
                <StatCard
                  title="📘 Courses Tracked"
                  value={`${data.overall_stats.number_of_courses ?? "N/A"}`}
                />
              </div>
              <StatCard
                title="📈 Performance Trend"
                value={data.overall_stats.performance_trend ?? "Not Available"}
              />
            </div>

            {data.overall_stats.resources?.length ? (
              <div className="bg-neutral-800 p-6 rounded-lg shadow-md hover:scale-[1.04] transition duration-300">
                <h2 className="text-lg font-semibold mb-4">📚 Top Resources</h2>
                <ul className="list-disc list-inside space-y-2">
                  {data.overall_stats.resources.map((resource, idx) => (
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
              </div>
            ) : null}

            <div className="text-center pt-4">
              <button
                onClick={handleViewResults}
                className="bg-[#94d8df] text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-neutral-900 transition"
              >
                View Detailed Results
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 ml-6 pb-6 text-sm text-light-cyans">
        © 2025{" "}
        <a
          href="https://www.linkedin.com/in/rerel-oluwa-tooki-cnvp-b53396253/"
          target="_blank"
          className="underline text-[#94d8df]"
          title="About Subomi Ibukun"
        >
          Subomi Ibukun
        </a>
      </div>
    </div>
  );
};

// Reusable card component
const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-neutral-800 p-6 rounded-lg shadow-md hover:scale-[1.04] transition duration-300">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
