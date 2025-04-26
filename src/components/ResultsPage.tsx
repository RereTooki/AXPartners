// src/pages/Results.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import PredictionChart from "../components/PredictionChart";
import SuggestionBox from "../components/SuggestionBox";

interface ResultData {
  predictedGrade: number;
  recommendedHours: number;
  personalizedAdvice: string;
}

const Results = () => {
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    // Mock data (replace this with API call later)
    const mockResult: ResultData = {
      predictedGrade: 78,
      recommendedHours: 12,
      personalizedAdvice:
        "Focus more on time management and break down complex topics into smaller chunks.",
    };

    setResult(mockResult); // Set mock data as if it was fetched from API

    // You can uncomment the API call code when you have the real backend ready
    // const fetchResults = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:5000/api/results');
    //     setResult(res.data);
    //   } catch (error) {
    //     console.error('Failed to fetch result data', error);
    //   }
    // };

    // fetchResults();
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
              <PredictionChart grade={result.predictedGrade} />
            </div>

            {/* Recommended Study Hours Section */}
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                ⏳ Weekly Study Hours Recommendation
              </h2>
              <p className="text-2xl">{result.recommendedHours} hrs/week</p>
            </div>

            {/* Personalized Advice Section */}
            <SuggestionBox advice={result.personalizedAdvice} />
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading your results...</p>
        )}
      </div>
    </div>
  );
};

export default Results;
