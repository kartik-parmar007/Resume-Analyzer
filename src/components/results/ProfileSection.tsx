import React from 'react';
import { User } from 'lucide-react';

interface ProfileSectionProps {
  summary: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transform transition-all">
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Profile Summary</h3>
            <p className="text-gray-600 text-sm">
              AI-generated overview of your professional profile
            </p>
          </div>
        </div>
        
        <div className="prose max-w-none mt-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};