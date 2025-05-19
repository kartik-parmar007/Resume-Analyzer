import React from 'react';
import { TrendingUp } from 'lucide-react';

interface EnhancementSectionProps {
  suggestions: Record<string, string>;
}

export const EnhancementSection: React.FC<EnhancementSectionProps> = ({ suggestions }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Skill Enhancement Suggestions</h3>
            <p className="text-gray-600 text-sm">
              Ways to improve your existing skills
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          {Object.entries(suggestions).length > 0 ? (
            Object.entries(suggestions).map(([skill, suggestion], index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{skill}</h4>
                <p className="text-gray-700 whitespace-pre-line">{suggestion}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                    Certification
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                    Course
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs">
                    Project
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No enhancement suggestions available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};