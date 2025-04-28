import { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [formData, setFormData] = useState({
    lectureHours: "",
    extracurricularHours: "",
    difficultyLevel: "",
    learningType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/input", formData);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Submission error", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-8">
      <div
        className="bg-neutral-800 p-10 rounded-lg shadow-lg w-full max-w-2xl"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <h1 className="text-2xl font-bold mb-2">Input Your Academic Details</h1>
        <p className="text-sm text-gray-400 mb-8">
          Help AX Partners personalize your learning journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm mb-1" htmlFor="lectureHours">
              Hours of Lectures per Week
            </label>
            <input
              type="number"
              name="lectureHours"
              id="lectureHours"
              value={formData.lectureHours}
              onChange={handleChange}
              required
              className="bg-neutral-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="e.g., 10"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1" htmlFor="extracurricularHours">
              Time Spent on Extracurricular Activities (Hours)
            </label>
            <input
              type="number"
              name="extracurricularHours"
              id="extracurricularHours"
              value={formData.extracurricularHours}
              onChange={handleChange}
              required
              className="bg-neutral-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="e.g., 5"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1" htmlFor="difficultyLevel">
              Perceived Difficulty Level
            </label>
            <select
              name="difficultyLevel"
              id="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
              required
              className="bg-neutral-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1" htmlFor="learningType">
              Preferred Learning Type
            </label>
            <select
              name="learningType"
              id="learningType"
              value={formData.learningType}
              onChange={handleChange}
              required
              className="bg-neutral-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select</option>
              <option value="Visual">Visual</option>
              <option value="Auditory">Auditory</option>
              <option value="Kinesthetic">Kinesthetic</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-white text-neutral-900 font-semibold py-3 rounded-md hover:bg-gray-200 w-full hover:scale-[1.02] transition ease-in-out duration-500 delay-10 hover:bg-[#94d8df] hover:text-white"
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
