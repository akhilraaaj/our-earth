/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Image as ImageIcon,
  LogOut,
  Loader,
  X,
  Edit,
  Trash2,
} from "lucide-react";
import MyPosts from "./MyPosts";
import Footer from "./content/Footer";

const stockAvatars = [
  "https://cdn-icons-png.flaticon.com/128/4140/4140061.png",
  "https://cdn-icons-png.flaticon.com/128/921/921124.png",
  "/api/placeholder/128/128",
  "/api/placeholder/128/128",
];

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/128/4140/4140061.png";

const UserProfile = ({ user, setUserAvatar }) => {
  const [profileData, setProfileData] = useState({
    photoURL: user?.photoURL || DEFAULT_AVATAR,
    displayName: user?.displayName || "",
    bio: "",
    location: "",
    social: { twitter: "", linkedin: "", github: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postCount, setPostCount] = useState(0);

  // Fetch user profile whenever user changes
  useEffect(() => {
    if (user?.uid) {
      fetchUserProfile();
    }
  }, [user?.uid]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const fetchUserProfile = async () => {
    if (!user?.uid) return;

    setLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setProfileData({
          photoURL: userData.profilePic || user.photoURL || DEFAULT_AVATAR,
          displayName: userData.displayName || user.displayName || "",
          bio: userData.bio || "",
          location: userData.location || "",
          social: userData.social || { twitter: "", linkedin: "", github: "" },
        });
      } else {
        // Create initial user document if it doesn't exist
        await setDoc(userDocRef, {
          profilePic: user.photoURL || DEFAULT_AVATAR,
          displayName: user.displayName || "",
          bio: "",
          location: "",
          social: { twitter: "", linkedin: "", github: "" },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
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
    if (!user?.uid) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userDocRef = doc(db, "users", user.uid);
      let imageUrl = profileData.photoURL;

      if (customImage) {
        const imageRef = ref(
          storage,
          `profileImages/${user.uid}/${Date.now()}-${customImage.name}`
        );
        await uploadBytes(imageRef, customImage);
        imageUrl = await getDownloadURL(imageRef);
      } else if (selectedAvatar) {
        imageUrl = selectedAvatar;
      }

      const updateData = {
        profilePic: imageUrl,
        displayName: profileData.displayName.trim(),
        bio: profileData.bio.trim(),
        location: profileData.location.trim(),
        social: {
          twitter: profileData.social.twitter.trim(),
          linkedin: profileData.social.linkedin.trim(),
          github: profileData.social.github.trim(),
        },
        updatedAt: new Date(),
      };

      await updateDoc(userDocRef, updateData);

      // Update local state
      setProfileData((prev) => ({
        ...prev,
        photoURL: imageUrl,
      }));

      // Update parent component
      setUserAvatar(imageUrl);

      // Reset image states
      setCustomImage(null);
      setSelectedAvatar(null);
      setPreviewImage(null);

      // Close modal
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (!user?.uid) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, {
        profilePic: DEFAULT_AVATAR,
        updatedAt: new Date(),
      });

      // Update local state
      setProfileData((prev) => ({
        ...prev,
        photoURL: DEFAULT_AVATAR,
      }));

      // Update parent component
      setUserAvatar(DEFAULT_AVATAR);

      // Reset image states
      setCustomImage(null);
      setSelectedAvatar(null);
      setPreviewImage(null);

      // Show success message (optional)
      // You could add a success state if you want to show a success message
    } catch (err) {
      console.error("Error removing profile picture:", err);
      setError("Failed to remove profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="overflow-x-hidden w-full bg-pattern">
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
            <div className="bg-white/90 rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <img
                    src={profileData.photoURL || DEFAULT_AVATAR}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_AVATAR;
                    }}
                  />
                </div>
                <h2 className="text-xl font-bold mb-1">
                  {profileData.displayName}
                </h2>
                <p className="text-gray-600 font-semibold text-md mb-2">
                  {user.email}
                </p>
                {profileData.bio && (
                  <p className="text-gray-700 text-md text-center mb-4">
                    {profileData.bio}
                  </p>
                )}
                {profileData.location && (
                  <p className="text-gray-600 text-md mb-4">
                    📍 {profileData.location}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 py-4 border-y border-gray-100">
                <div className="text-base font-bold text-gray-600">
                  Post{postCount === 1 ? "" : "s"}
                </div>
                <div className="font-bold">{postCount}</div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-[#00a96e] w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
                >
                  <span className="text-white font-bold">Log Out</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            {Object.entries(profileData.social).some(([_, value]) => value) && (
              <div className="bg-white/90 rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">Social Links</h3>
                <div className="space-y-3">
                  {Object.entries(profileData.social).map(
                    ([platform, value]) =>
                      value && (
                        <a
                          key={platform}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center font-semibold text-slate-800 hover:text-slate-700 transition-colors"
                        >
                          <span className="capitalize">{platform}</span>
                        </a>
                      )
                  )}
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
                  {/* Current Profile Picture */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <img
                        src={
                          previewImage || profileData.photoURL || DEFAULT_AVATAR
                        }
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {profileData.photoURL !== DEFAULT_AVATAR && (
                        <button
                          onClick={handleRemoveProfilePicture}
                          className="absolute -bottom-2 -right-2 p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors group"
                          title="Remove profile picture"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Avatar Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Profile Picture</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {stockAvatars.map((avatar, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer relative"
                        >
                          <img
                            src={avatar}
                            alt={`Avatar ${index + 1}`}
                            className={`w-full rounded-lg border-2 ${
                              selectedAvatar === avatar
                                ? "border-blue-500"
                                : "border-transparent"
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
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
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            displayName: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
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
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Social Links */}
                    {Object.entries(profileData.social).map(
                      ([platform, value]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {platform.charAt(0).toUpperCase() +
                              platform.slice(1)}
                          </label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                social: {
                                  ...prev.social,
                                  [platform]: e.target.value,
                                },
                              }))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter your ${platform} ${
                              platform === "twitter"
                                ? "username"
                                : "profile URL"
                            }`}
                          />
                        </div>
                      )
                    )}
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
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-20">
        <Footer bgColor="#00704A" />
      </div>
    </div>
  );
};

export default UserProfile;
