// Courses.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Course {
  course_name: string;
  hours_for_lecture: number;
  learning_type: number;
  difficulty_level: number;
  predicted_performance: number;
  study_time: number;
  publisher: string;
  textbooks: string;
  youtube_URL: string;
  advice: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) throw new Error("User not logged in");

        const response = await axios.get<Course[]>(
          `http://localhost:8000/courses/${userId}`
        );
        setCourses(response.data);
      } catch (err: any) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-center">
        📘 Tracked Courses
      </h1>

      {loading ? (
        <p className="text-gray-400 text-center">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3">
                {course.course_name}
              </h2>
              <div className="space-y-1 text-sm text-gray-200">
                <p>
                  🎓 <strong>Lecture Hours:</strong> {course.hours_for_lecture}
                </p>
                <p>
                  📈 <strong>Predicted Performance:</strong>{" "}
                  {course.predicted_performance}/100
                </p>
                <p>
                  📚 <strong>Study Time:</strong> {course.study_time} hrs/week
                </p>
                <p>
                  🔥 <strong>Difficulty Level:</strong>{" "}
                  {course.difficulty_level}/10
                </p>
                <p>
                  🏢 <strong>Publisher:</strong> {course.publisher}
                </p>
              </div>

              {/* Dropdowns */}
              <div className="mt-4 space-y-3">
                <details className="bg-neutral-700 rounded-lg px-4 py-2 cursor-pointer group">
                  <summary className="font-medium text-white group-open:underline">
                    📖 View Textbooks
                  </summary>
                  <p className="mt-2 text-gray-300 whitespace-pre-line">
                    {course.textbooks}
                  </p>
                </details>

                <details className="bg-neutral-700 rounded-lg px-4 py-2 cursor-pointer group">
                  <summary className="font-medium text-white group-open:underline">
                    ▶️ View YouTube Links
                  </summary>
                  <ul className="mt-2 list-disc ml-6 text-blue-400 whitespace-pre-line">
                    {course.youtube_URL.split("\n").map((url, i) => (
                      <li key={i}>
                        <a
                          href={url.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {url.trim()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>

                <details className="bg-neutral-700 rounded-lg px-4 py-2 cursor-pointer group">
                  <summary className="font-medium text-white group-open:underline">
                    🧠 View Study Advice
                  </summary>
                  <p className="mt-2 text-gray-300 whitespace-pre-line">
                    {course.advice}
                  </p>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
