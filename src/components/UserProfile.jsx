import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  UserIcon, 
  Settings, 
  Image as ImageIcon, 
  Activity,
  Bookmark,
  LogOut,
  Loader,
  X,
  Edit
} from 'lucide-react';
import MyPosts from './MyPosts';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postCount, setPostCount] = useState(0);

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Dashboard */}
        <motion.div 
          className="col-span-3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={profileData.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <h2 className="text-xl font-bold mb-1">{profileData.displayName}</h2>
              <p className="text-gray-600 text-sm mb-2">{user.email}</p>
              {profileData.bio && (
                <p className="text-gray-700 text-sm text-center mb-4">{profileData.bio}</p>
              )}
              {profileData.location && (
                <p className="text-gray-600 text-sm mb-4">
                  📍 {profileData.location}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
              <div className="text-center">
                <div className="font-bold">{postCount}</div>
                <div className="text-xs text-gray-600">Post{postCount === 1 ? '' : 's'}</div>
              </div>
              <div className="text-center">
                <div className="font-bold">0</div>
                <div className="text-xs text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold">0</div>
                <div className="text-xs text-gray-600">Following</div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Social Links */}
          {Object.entries(profileData.social).some(([_, value]) => value) && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-semibold mb-4">Social Links</h3>
              <div className="space-y-3">
                {Object.entries(profileData.social).map(([platform, value]) => (
                  value && (
                    <a
                      key={platform}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <span className="capitalize">{platform}</span>
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Side - Posts */}
        <motion.div 
          className="col-span-9"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MyPosts user={user} setPostCount={setPostCount} />
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Edit Profile</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Profile Picture</h3>
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

                {/* Profile Information */}
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

                  {/* Social Links */}
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
              </div>

              {error && (
                <div className="px-6 pb-4">
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {error}
                  </div>
                </div>
              )}

              <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  onClick={() => {
                    setCustomImage(null);
                    setSelectedAvatar(null);
                    setPreviewImage(null);
                    setIsModalOpen(false);
                    fetchUserProfile();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await handleProfileUpdate();
                    setIsModalOpen(false);
                  }}
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;