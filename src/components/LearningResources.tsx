// src/pages/LearningResources.tsx

import { useEffect, useState } from "react";
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
    // Mock data (replace this with API call later)
    const mockResources: Resource[] = [
      {
        title: "How to Improve Time Management",
        type: "Article",
        link: "https://example.com/time-management-article",
        description:
          "An in-depth article on improving your time management skills.",
      },
      {
        title: "React Tutorial for Beginners",
        type: "Video",
        link: "https://youtube.com/watch?v=example",
        description: "A beginner-friendly video tutorial on React.",
      },
      {
        title: "Understanding Data Structures",
        type: "Article",
        link: "https://example.com/data-structures-article",
        description:
          "An article that breaks down common data structures and their use cases.",
      },
      {
        title: "Advanced JavaScript Concepts",
        type: "Video",
        link: "https://youtube.com/watch?v=example2",
        description: "A detailed video on advanced JavaScript concepts.",
      },
      {
        title: "Time Management for Students",
        type: "Article",
        link: "https://example.com/time-management-for-students",
        description:
          "An article specifically designed for students on managing their time effectively.",
      },
    ];

    setResources(mockResources); // Setting mock data as if it was fetched from API

    // Uncomment and use the following when API is available:
    // const fetchResources = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:5000/api/resources');
    //     setResources(res.data);
    //   } catch (error) {
    //     console.error('Failed to fetch resources data', error);
    //   }
    // };

    // fetchResources();
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
