import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { ChevronDown, ChevronUp, Trash, Edit, Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const MyPosts = ({ user, setPostCount }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [loading, setLoading] = useState(true);

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
        setPostCount(postsList.length);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch your posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, setPostCount]);

  const handleDelete = async (postId, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
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

  const toggleExpand = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-right" />
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-green-800">
          My Posts
        </h1>
        <Link to="/home/create-post">
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105">
            <Plus size={20} />
            Add Post
          </button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't created any posts yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <div 
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(post.id, post.imageUrl)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
                      title="Delete post"
                    >
                      <Trash size={20} />
                    </button>
                    <Link to={`/home/edit/${post.id}`}>
                      <button 
                        className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors duration-300"
                        title="Edit post"
                      >
                        <Edit size={20} />
                      </button>
                    </Link>
                  </div>
                </div>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                )}

                <div className={`relative overflow-hidden transition-all duration-300 ${
                  expandedPosts[post.id] ? 'max-h-full' : 'max-h-24'
                }`}>
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  {!expandedPosts[post.id] && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-500 italic">By {post.author}</span>
                    <span className="text-xs text-gray-400">
                      {post.updatedAt ? (
                        <>Updated: {post.updatedAt.toDate().toLocaleDateString()}</>
                      ) : (
                        <>Posted: {post.createdAt.toDate().toLocaleDateString()}</>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors duration-300"
                  >
                    {expandedPosts[post.id] ? (
                      <>
                        <ChevronUp size={20} />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={20} />
                        View More
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;