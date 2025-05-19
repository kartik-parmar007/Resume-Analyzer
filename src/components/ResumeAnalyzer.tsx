import React, { useState } from 'react';
import { UploadResume } from './UploadResume';
import { AnalysisResults } from './AnalysisResults';
import { LoadingState } from './LoadingState';
import { analyzeResume } from '../services/geminiService';
import { ResumeAnalysisResult } from '../types';

export const ResumeAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<ResumeAnalysisResult | null>(null);
  
  const handleResumeUpload = async (text: string) => {
    setResumeText(text);
    setIsAnalyzing(true);
    
    try {
      const results = await analyzeResume(text);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setResumeText(null);
    setAnalysisResults(null);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {!resumeText && !analysisResults && (
        <UploadResume onUpload={handleResumeUpload} />
      )}
      
      {isAnalyzing && (
        <LoadingState />
      )}
      
      {!isAnalyzing && analysisResults && (
        <AnalysisResults 
          results={analysisResults}
          onReset={handleReset}
        />
      )}
    </div>
  );
};