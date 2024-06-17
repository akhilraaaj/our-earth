import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage, ref, uploadBytes, getDownloadURL } from '../firebase'; // Updated import
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setContent(postData.content);
          setImageUrl(postData.imageUrl || '');
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!title || !content) return;

    try {
      setLoading(true); // Set loading to true while processing

      let updatedImageUrl = imageUrl;
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        updatedImageUrl = await getDownloadURL(imageRef);
      }

      // Update post details including the image URL
      await Promise.all([
        updateDoc(doc(db, 'posts', id), {
          title,
          content,
          imageUrl: updatedImageUrl,
          updatedAt: new Date()
        }),
        imageUrl !== updatedImageUrl ? updatedImageUrl : null // Add updated image URL if changed
      ]);

      setLoading(false); // Set loading to false after update
      toast.success('Post updated successfully');
      navigate('/home/blog');
    } catch (err) {
      setLoading(false); // Set loading to false in case of error
      setError(err.message);
      toast.error('Failed to update post');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Edit Post</h1>
      <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
          />
          {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 rounded-lg" style={{ maxWidth: '100%' }} />}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;
