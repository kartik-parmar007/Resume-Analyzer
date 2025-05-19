import React, { useState } from 'react';
import { SkillsSection } from './results/SkillsSection';
import { EnhancementSection } from './results/EnhancementSection';
import { RecommendationsSection } from './results/RecommendationsSection';
import { JobRolesSection } from './results/JobRolesSection';
import { ProfileSection } from './results/ProfileSection';
import { ResumeAnalysisResult } from '../types';
import { Download, RefreshCw } from 'lucide-react';

interface AnalysisResultsProps {
  results: ResumeAnalysisResult;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, onReset }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleExport = () => {
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-analysis.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Resume Analysis Results</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={onReset}
            className="flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Analyze Another Resume
          </button>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile Summary
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'skills'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('enhancement')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'enhancement'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Skill Enhancement
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'recommendations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recommended Skills
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'jobs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Job Roles
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'profile' && <ProfileSection summary={results.ProfileSummary} />}
        {activeTab === 'skills' && <SkillsSection skills={results.ExtractedSkills} />}
        {activeTab === 'enhancement' && (
          <EnhancementSection suggestions={results.SkillEnhancementSuggestions} />
        )}
        {activeTab === 'recommendations' && (
          <RecommendationsSection recommendations={results.RecommendedSkills} />
        )}
        {activeTab === 'jobs' && <JobRolesSection jobRoles={results.SuggestedJobRoles} />}
      </div>
    </div>
  );
};