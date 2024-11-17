import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  UserIcon, 
  SettingsIcon, 
  ImageIcon, 
  ActivityIcon,
  BookmarkIcon,
  LogOutIcon,
  Loader
} from 'lucide-react';

const stockAvatars = [
  '/api/placeholder/128/128',
  '/api/placeholder/128/128',
  '/api/placeholder/128/128',
  '/api/placeholder/128/128'
];

const UserProfile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    photoURL: '',
    displayName: '',
    bio: '',
    location: '',
    social: { twitter: '', linkedin: '', github: '' }
  });
  const [stats, setStats] = useState({
    posts: 0,
    followers: 0,
    following: 0
  });
  const [activeTab, setActiveTab] = useState('edit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchUserStats();
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfileData({
          photoURL: userData.profilePic || user.photoURL,
          displayName: userData.displayName || user.displayName,
          bio: userData.bio || '',
          location: userData.location || '',
          social: userData.social || { twitter: '', linkedin: '', github: '' }
        });
      }
    } catch (err) {
      setError('Error fetching profile data');
      console.error(err);
    }
  };

  const fetchUserStats = async () => {
    try {
      const postsQuery = query(collection(db, 'posts'), where('userId', '==', user.uid));
      const postsSnapshot = await getDocs(postsQuery);
      
      setStats({
        posts: postsSnapshot.size,
        followers: Math.floor(Math.random() * 100),
        following: Math.floor(Math.random() * 50)
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomImage(file);
      setSelectedAvatar(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setCustomImage(null);
    setPreviewImage(avatar);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            console.log("Document doesn't exist. Creating a new one...");
            await setDoc(userDocRef, {
                displayName: profileData.displayName,
                bio: profileData.bio,
                location: profileData.location,
                social: profileData.social,
                profilePic: profileData.photoURL,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        let imageUrl = profileData.photoURL;

        if (customImage) {
            const imageRef = ref(storage, `profileImages/${user.uid}/${Date.now()}`);
            await uploadBytes(imageRef, customImage);
            imageUrl = await getDownloadURL(imageRef);
        } else if (selectedAvatar) {
            imageUrl = selectedAvatar;
        }

        await updateDoc(userDocRef, {
            displayName: profileData.displayName,
            bio: profileData.bio,
            location: profileData.location,
            social: profileData.social,
            profilePic: imageUrl,
            updatedAt: new Date(),
        });

        setProfileData((prev) => ({ ...prev, photoURL: imageUrl }));
        setCustomImage(null);
        setSelectedAvatar(null);
        setPreviewImage(null);
        setError(null);
    } catch (err) {
        console.error('Error updating profile:', err.message, err.stack);
        setError('Error updating profile');
    } finally {
        setLoading(false);
    }
};


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-8 mt-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div variants={cardVariants} className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <motion.div 
                className="relative w-32 h-32 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={previewImage || profileData.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
                <motion.div 
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                </motion.div>
              </motion.div>
              <h2 className="text-xl font-bold mb-1">{profileData.displayName}</h2>
              <p className="text-gray-600 text-sm mb-4">{user.email}</p>
              
              <div className="grid grid-cols-3 gap-4 w-full mb-6">
                <div className="text-center">
                  <div className="font-bold">{stats.posts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{stats.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div variants={cardVariants} className="md:col-span-2">
          {/* Custom Tabs */}
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            {['edit', 'avatar', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              {activeTab === 'edit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        displayName: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        bio: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        location: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'avatar' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    {stockAvatars.map((avatar, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                      >
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={`w-full rounded-lg border-2 ${
                            selectedAvatar === avatar ? 'border-blue-500' : 'border-transparent'
                          }`}
                          onClick={() => handleAvatarSelect(avatar)}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageSelect}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  {Object.entries(profileData.social).map(([platform, value]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          social: { ...prev.social, [platform]: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter your ${platform} ${platform === 'twitter' ? 'username' : 'profile URL'}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => {
                setCustomImage(null);
                setSelectedAvatar(null);
                setPreviewImage(null);
                fetchUserProfile();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfile;