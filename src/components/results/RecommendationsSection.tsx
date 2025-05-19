import React from 'react';
import { PlusCircle } from 'lucide-react';

interface RecommendationsSectionProps {
  recommendations: string[];
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ recommendations }) => {
  // Group recommendations into categories
  // This is just for demo purposes - in a real app you'd have better categorization
  const categories = ['Technical', 'Soft Skills', 'Industry Knowledge', 'Tools'];
  
  const groupedRecommendations = recommendations.reduce((acc: Record<string, string[]>, skill, index) => {
    const category = categories[index % categories.length];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <PlusCircle className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Recommended Skills</h3>
            <p className="text-gray-600 text-sm">
              New skills to learn that can enhance your career prospects
            </p>
          </div>
        </div>
        
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedRecommendations).map(([category, skills]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-medium text-gray-800 mb-3">{category}</h4>
                <ul className="space-y-3">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-600 rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></span>
                      <div>
                        <p className="font-medium text-gray-800">{skill}</p>
                        <p className="text-sm text-gray-600">
                          High demand in your industry
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No skill recommendations available.
          </div>
        )}
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">Why these skills?</h4>
          <p className="text-blue-700 text-sm">
            These recommendations are based on current industry trends, job market demand, 
            and alignment with your existing skill set and career trajectory.
          </p>
        </div>
      </div>
    </div>
  );
};