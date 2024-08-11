import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../firebase';
import MyPosts from './MyPosts';
import { FaSpinner } from 'react-icons/fa'; // Import a spinner icon from react-icons

// Sample stock images URLs
const stockImages = [
  'https://cdn-icons-png.flaticon.com/128/4140/4140061.png',
  'https://cdn-icons-png.flaticon.com/128/921/921124.png',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];

const UserProfile = ({ user }) => {
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const [error, setError] = useState(null);
  const [customImage, setCustomImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image (stock or custom)
  const [loading, setLoading] = useState(false); // State for loading status

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user profile data from Firestore
        const userDoc = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDoc);
        const userData = userDocSnap.data();

        // Update the newPhotoURL state with the fetched profilePic
        if (userData && userData.profilePic) {
          setNewPhotoURL(userData.profilePic);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleSelectStockImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setCustomImage(null);
  };

  const handlePhotoChange = (e) => {
    setSelectedImage(null);
    setCustomImage(e.target.files[0]);
  };

  const handleUploadCustomImage = async () => {
    if (!selectedImage && !customImage) return;

    setLoading(true); // Set loading state to true
    try {
      let imageUrl = selectedImage;

      if (customImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, customImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      setNewPhotoURL(imageUrl);
      setCustomImage(null);
      setSelectedImage(null);
      updateProfilePhoto(imageUrl); // Update profile photo in Firestore
    } catch (error) {
      console.error('Error uploading custom image:', error);
      setError('Error uploading custom image');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const updateProfilePhoto = async (photoURL) => {
    setLoading(true); // Set loading state to true
    try {
      // Update profilePic field in the user document
      await updateDoc(doc(db, 'users', user.uid), {
        profilePic: photoURL
      });
      console.log('Profile photo updated successfully');
    } catch (error) {
      console.error('Error updating profile photo:', error);
      setError('Error updating profile photo');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-32 flex justify-between">
      <div className='w-4/12'>
        <h1 className="font-bold mb-6">User Profile</h1>
        <p className="text-xl font-semibold">{user.displayName}</p>
        <div className="flex flex-col items-center mb-4">
          <img src={newPhotoURL || user.photoURL} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex">
              {stockImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt=""
                  className={`w-12 h-12 rounded-full border mr-2 cursor-pointer ${selectedImage === imageUrl ? 'border-blue-500' : ''}`}
                  onClick={() => handleSelectStockImage(imageUrl)}
                />
              ))}
            </div>
            <input type="file" onChange={handlePhotoChange} />
            <button
              onClick={handleUploadCustomImage}
              disabled={loading}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? <FaSpinner className="animate-spin" /> : 'Save changes'}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className='w-8/12'>
        <MyPosts user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
