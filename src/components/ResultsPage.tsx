// src/pages/Results.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import PredictionChart from "../components/PredictionChart";
import SuggestionBox from "../components/SuggestionBox";

interface Course {
  course_name: string;
}

interface ResultData {
  course_name: string;
  predicted_grade: number;
  study_hours_per_week: number;
  personalized_advice: string;
}

const Results = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          `http://localhost:8000/courses/${userId}`
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, [userId]);

  const handleCourseClick = async (courseName: string) => {
    setSelectedCourse(courseName);
    setLoading(true);
    try {
      const response = await axios.get<ResultData>(
        `http://localhost:8000/users/${userId}/predictions/${courseName}`
      );
      setResult(response.data);
    } catch (error) {
      console.error("Failed to fetch result data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-center">
          📊 Personalized Prediction Results
        </h1>
        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
          Curious about how you’re predicted to perform in your courses? Click
          any subject below to get an AI-generated performance overview, study
          hours, and actionable advice tailored just for you.
        </p>

        {!selectedCourse ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <div
                key={idx}
                onClick={() => handleCourseClick(course.course_name)}
                className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-xl p-6 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <h2 className="text-xl font-semibold capitalize">
                  {course.course_name}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  Tap to see predicted score and study tips.
                </p>
              </div>
            ))}
          </div>
        ) : loading ? (
          <p className="text-center text-gray-400 mt-10">
            Fetching prediction...
          </p>
        ) : result ? (
          <div className="space-y-10">
            <button
              className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded mb-4"
              onClick={() => {
                setSelectedCourse(null);
                setResult(null);
              }}
            >
              ← Back to Courses
            </button>

            <h2 className="text-3xl font-bold text-center capitalize">
              Results for {result.course_name}
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-neutral-800 p-6 rounded-lg shadow-lg col-span-1 flex flex-col justify-center items-center">
                <h3 className="text-lg font-medium mb-2">🎯 Predicted Grade</h3>
                <PredictionChart grade={result.predicted_grade} />
                <p className="mt-2 text-gray-400 text-sm">
                  Based on your academic profile and inputs.
                </p>
              </div>

              <div className="bg-neutral-800 p-6 rounded-lg shadow-lg col-span-1 flex flex-col justify-center">
                <h3 className="text-lg font-medium mb-2">
                  ⏳ Suggested Weekly Study Time
                </h3>
                <p className="text-3xl font-semibold text-blue-400">
                  {result.study_hours_per_week.toFixed(1)} hrs/week
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  To improve or maintain this predicted performance.
                </p>
              </div>

              <div className="col-span-1">
                <SuggestionBox advice={result.personalized_advice} />
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-10">
              Note: These results are AI-generated estimates based on current
              study habits, course difficulty, and other personal factors.
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400">Failed to load prediction.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
