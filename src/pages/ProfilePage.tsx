import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Profile {
  username: string;
  is_verified: boolean;
}

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function getProfile() {
      if (user) {
        setLoadingProfile(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('username, is_verified')
          .eq('id', user.id)
          .single();
        
        if (!error && data) {
          setProfile(data);
        }
        setLoadingProfile(false);
      }
    }

    getProfile();
  }, [user]);

  if (loading || loadingProfile) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/10 rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {profile && !profile.is_verified && (
          <div className="mb-6 bg-yellow-500/20 text-yellow-200 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Email Verification Pending</h3>
            <p>Please check your email and click the verification link to complete your registration.</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <p className="mt-1 text-lg">{user.email}</p>
            {profile && profile.is_verified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                Verified
              </span>
            )}
          </div>
          
          {profile && (
            <div>
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <p className="mt-1 text-lg">{profile.username}</p>
            </div>
          )}
          
          <div className="border-t border-white/10 pt-4">
            <h2 className="text-xl font-semibold mb-4">Resume History</h2>
            <p className="text-gray-300">Your previous resume analyses will appear here.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;