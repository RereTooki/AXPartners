import { useEffect, useState } from "react";
import axios from "axios";

interface ResultData {
  predictedGrade: number;
  recommendedHours: number;
  personalizedAdvice: string;
}

const Results = () => {
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/results");
        setResult(res.data);
      } catch (error) {
        console.error("Failed to fetch result data", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-2">
          AX Partners - Prediction Results
        </h1>
        <p className="text-gray-400 mb-10">
          Here’s your personalized academic insight.
        </p>

        {/* Results Content */}
        {result ? (
          <div className="space-y-8">
            {/* Predicted Grade Section */}
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">🎯 Predicted Grade</h2>
              <div className="w-32 h-32 border-8 border-green-400 rounded-full flex items-center justify-center text-2xl font-bold">
                {result.predictedGrade}%
              </div>
            </div>

            {/* Recommended Study Hours Section */}
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                ⏳ Weekly Study Hours Recommendation
              </h2>
              <p className="text-2xl">{result.recommendedHours} hrs/week</p>
            </div>

            {/* Personalized Advice Section */}
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                💡 Personalized Advice
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {result.personalizedAdvice}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading your results...</p>
        )}
      </div>
    </div>
  );
};

export default Results;
