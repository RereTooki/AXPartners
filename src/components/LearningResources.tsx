// src/pages/LearningResources.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import ResourceCard from "../components/ResourceCard";

interface Resource {
  title: string;
  type: "Video" | "Article";
  link: string;
  description: string;
}

const LearningResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resources");
        setResources(res.data);
      } catch (error) {
        console.error("Failed to fetch resources data", error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-2">
          AX Partners - Learning Resources
        </h1>
        <p className="text-gray-400 mb-10">
          Curated resources to help you succeed.
        </p>

        {/* Resources Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                type={resource.type}
                link={resource.link}
                description={resource.description}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Loading resources...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningResources;
