import React from 'react';
import { FileText, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="backdrop-blur-lg bg-black/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              ResumeAI
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/resume" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Resume/CV
            </Link>
            {user && (
              <Link 
                to="/profile" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Profile
              </Link>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAuthClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{user ? 'Sign Out' : 'Sign In'}</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;