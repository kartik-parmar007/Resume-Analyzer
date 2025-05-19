import React from 'react';
import { Zap } from 'lucide-react';

interface SkillsSectionProps {
  skills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Group skills into categories (assuming we don't have categories from the API)
  // In a real app, you might want to categorize skills by type (technical, soft, etc.)
  const skillGroups = groupSkills(skills);
  
  function groupSkills(skills: string[]) {
    // This is a simplified example - in a real app, you might use a more sophisticated approach
    // or get the categories from the API
    const groups: Record<string, string[]> = {
      'Technical Skills': [],
      'Soft Skills': [],
      'Languages & Frameworks': [],
      'Tools & Platforms': [],
      'Other Skills': []
    };
    
    // For this demo, just distribute skills randomly
    skills.forEach((skill, index) => {
      const groupKeys = Object.keys(groups);
      const groupIndex = index % groupKeys.length;
      groups[groupKeys[groupIndex]].push(skill);
    });
    
    return groups;
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transform transition-all">
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Extracted Skills</h3>
            <p className="text-gray-600 text-sm">
              Skills identified from your resume
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillGroups).map(([category, categorySkills]) => (
            categorySkills.length > 0 && (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
        
        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No skills were extracted from your resume.
          </div>
        )}
      </div>
    </div>
  );
};