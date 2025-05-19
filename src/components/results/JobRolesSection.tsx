import React from 'react';
import { Briefcase } from 'lucide-react';

interface JobRolesSectionProps {
  jobRoles: string[];
}

export const JobRolesSection: React.FC<JobRolesSectionProps> = ({ jobRoles }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Suggested Job Roles</h3>
            <p className="text-gray-600 text-sm">
              Career paths that match your skills and experience
            </p>
          </div>
        </div>
        
        {jobRoles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobRoles.map((role, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-gray-900 mb-2">{role}</h4>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-blue-600">
                    {Math.floor(70 + Math.random() * 30)}% match
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No job role suggestions available.
          </div>
        )}
        
        <div className="mt-8">
          <h4 className="font-semibold text-gray-800 mb-3">Career Path Visualization</h4>
          <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center h-48">
            <p className="text-gray-500 text-center">
              Career path visualization would appear here.
              <br />
              This would show progression from current roles to future opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};