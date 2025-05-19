import React from 'react';
import { motion } from 'framer-motion';
import { Background } from '../components/Background';
import { ArrowRight, Brain, Rocket, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <Background />
      <div className="relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-20 text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Elevate Your Career
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            Transform your resume with AI-powered insights, skill analysis, and personalized career guidance.
          </p>
          <Link
            to="/resume"
            className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="container mx-auto px-4 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-8 text-center">
              <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-300">
                Get detailed insights about your skills and experience using advanced AI technology.
              </p>
            </div>
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Skill Enhancement</h3>
              <p className="text-gray-300">
                Receive personalized recommendations to improve your existing skills.
              </p>
            </div>
            <div className="backdrop-blur-lg bg-white/10 rounded-xl p-8 text-center">
              <Rocket className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Career Growth</h3>
              <p className="text-gray-300">
                Discover new opportunities and career paths based on your profile.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;