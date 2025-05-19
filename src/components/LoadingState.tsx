import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="p-16 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">Analyzing your resume</h3>
      <p className="text-gray-600 text-center max-w-md">
        Our AI is extracting skills, preparing recommendations, and identifying career opportunities.
        This may take a moment...
      </p>
      
      {/* Progress Indicators */}
      <div className="mt-8 w-full max-w-md space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Extracting skills</span>
            <span className="text-sm text-gray-600">Step 1/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Analyzing skill levels</span>
            <span className="text-sm text-gray-600">Step 2/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-3/4 animate-pulse delay-150"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Generating recommendations</span>
            <span className="text-sm text-gray-600">Step 3/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-1/2 animate-pulse delay-300"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Finding job matches</span>
            <span className="text-sm text-gray-600">Step 4/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-1/4 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};