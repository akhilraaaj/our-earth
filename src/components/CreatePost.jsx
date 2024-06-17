import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebase'; // Import storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage functions
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) return;
  
    try {
      setLoading(true); // Set loading to true while processing
  
      let imageURL = '';
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
      }
  
      const postData = {
        title,
        content,
        imageUrl: imageURL, // Corrected imageUrl key
        author: user.email,
        createdAt: new Date()
      };
  
      // Add the post and wait for both the post addition and image upload to complete
      await Promise.all([
        addDoc(collection(db, 'posts'), postData),
        imageURL && imageURL !== '' ? imageURL : null // Add image URL if available
      ]);
  
      setTitle('');
      setContent('');
      setImage(null);
      setLoading(false); // Set loading to false after post is added
      toast.success('Post added successfully');
      navigate('/home/blog'); // Redirect to the blog page
    } catch (err) {
      setLoading(false); // Set loading to false in case of error
      setError(err.message);
      toast.error('Failed to add post');
    }
  };
  
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <Toaster />
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Create a New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Content</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Image</label>
            <input 
              type="file" 
              onChange={handleImageChange}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button 
              type="submit" 
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Submitting...' : 'Submit'} {/* Show loading text if loading */}
            </button>
          </div>
          {error && <div className='mt-4 text-red-500 text-sm'>{`Error: ${error}`}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
