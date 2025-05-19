import React from 'react';
import { ResumeAnalyzer } from '../components/ResumeAnalyzer';
import { motion } from 'framer-motion';

const ResumePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Resume Analyzer
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Upload your resume and get AI-powered insights to enhance your skills, 
          improve your career path, and discover new job opportunities.
        </p>
      </motion.section>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <ResumeAnalyzer />
      </motion.div>
    </div>
  );
};

export default ResumePage;