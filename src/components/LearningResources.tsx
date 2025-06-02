// Resources.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

interface Book {
  "Book-Title": string;
  "Book-Author": string;
  Publisher: string;
  "Year-Of-Publication": number;
}

interface Video {
  0: string; // URL
  1: string; // Title
}

const LearningResources = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) throw new Error("User not logged in");

        const response = await axios.get<Course[]>(
          `http://localhost:8000/courses/${userId}`
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = async (courseName: string) => {
    setSelectedCourse(courseName);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/recommendations/${courseName}`
      );
      setBooks(res.data.books);
      setVideos(res.data.videos);
    } catch (err) {
      console.error("Error fetching recommendations", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📚 Learning Resources
      </h1>
      {!selectedCourse ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((course, idx) => (
            <div
              key={idx}
              onClick={() => handleCourseClick(course.course_name)}
              className="cursor-pointer bg-neutral-800 rounded-xl p-4 hover:bg-neutral-700 transition"
            >
              <h2 className="text-xl font-semibold mb-1">
                {course.course_name}
              </h2>
              <p className="text-sm text-gray-400">
                Predicted Score: {course.predicted_performance}
              </p>
              <p className="text-sm text-gray-400">
                Difficulty: {course.difficulty_level}/10
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="mb-6 text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
            onClick={() => setSelectedCourse(null)}
          >
            ← Back to Courses
          </button>

          <h2 className="text-2xl font-semibold mb-4">
            📘 Books for {selectedCourse}
          </h2>
          {loading ? (
            <p>Loading recommendations...</p>
          ) : (
            <div className="grid gap-4">
              {books.map((book, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-800 p-4 rounded-lg shadow hover:bg-neutral-700"
                >
                  <h3 className="text-lg font-semibold">
                    {book["Book-Title"]}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Author: {book["Book-Author"]}
                  </p>
                  <p className="text-sm text-gray-300">
                    Publisher: {book.Publisher}
                  </p>
                  <p className="text-sm text-gray-300">
                    Year: {book["Year-Of-Publication"]}
                  </p>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            🎥 YouTube Resources
          </h2>
          <div className="space-y-4">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700"
              >
                <a
                  href={video[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {video[1]}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningResources;
