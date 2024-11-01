// MyPosts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';

const MyPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError("User is not logged in");
      return;
    }

    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, where("author", "==", user.email));
        const postsSnapshot = await getDocs(q);
        const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort posts by updatedAt or createdAt in descending order
        postsList.sort((a, b) => {
          const dateA = (a.updatedAt || a.createdAt).toDate();
          const dateB = (b.updatedAt || b.createdAt).toDate();
          return dateB - dateA;
        });

        setPosts(postsList);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, [user]);

  const handleDelete = async (postId, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      // If post has an image, delete it from Firebase Storage
      if (imageUrl) {
        // Implement image deletion here
      }
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete post');
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl  p-6">
      <Toaster />
      <h1 className="text-4xl font-bold text-center mb-6">My Posts</h1>
      <Link to='/home/create-post'><button className='btn btn-primary justify-end'>Add Post</button></Link>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 relative">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              {post.imageUrl && (
                <img src={post.imageUrl} alt="Post" className="mb-4 rounded-lg" style={{ maxWidth: '100%' }} />
              )}
              <p className="text-gray-700 mb-4">{post.content}</p>
              <p className="text-sm text-gray-500"><em>By {post.author}</em></p>
              <div className="absolute top-4 right-4 space-x-2">
                <button
                  onClick={() => handleDelete(post.id, post.imageUrl)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
                <Link to={`/home/blog/edit/${post.id}`}>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
