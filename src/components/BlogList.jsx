import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChevronDown, ChevronUp, Trash, Edit, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./content/Footer";

const BlogList = ({ user, showOnlyUserPosts = false }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        let postsQuery;

        if (showOnlyUserPosts && user) {
          postsQuery = query(
            postsCollection,
            where("author", "==", user.email)
          );
        } else {
          postsQuery = postsCollection;
        }

        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort posts by updatedAt or createdAt in descending order
        postsList.sort((a, b) => {
          const dateA = (a.updatedAt || a.createdAt).toDate();
          const dateB = (b.updatedAt || b.createdAt).toDate();
          return dateB - dateA;
        });

        setPosts(postsList);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, showOnlyUserPosts]);

  const handleDelete = async (postId, imageUrl) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      if (imageUrl) {
        // Implement image deletion here
      }
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete post");
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const canEditPost = (postAuthor) => {
    return user && user.email === postAuthor;
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
    <div className="overflow-x-hidden min-h-screen bg-pattern">
      <div className="max-w-4xl mx-auto mt-32 p-6 ">
        <Toaster position="top-right" />

        <div className="flex items-center justify-between mb-12">
          <h1 className="md:text-5xl text-4xl font-extrabold text-blue-50">
            {showOnlyUserPosts ? "My Posts" : "Blog Posts"}
          </h1>
          {user && (
            <Link to="/home/create-post">
              <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                <Plus size={20} />
                Add Post
              </button>
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              {showOnlyUserPosts
                ? "You haven't created any posts yet"
                : "No posts available"}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/90 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {post.title}
                    </h2>
                    {canEditPost(post.author) && (
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
                    )}
                  </div>

                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}

                  <div
                    className={`relative overflow-hidden transition-all duration-300 ${
                      expandedPosts[post.id] ? "max-h-full" : "max-h-24"
                    }`}
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {post.content}
                    </p>
                    {!expandedPosts[post.id] && (
                      <div className="absolute bottom-0 left-0 right-0 h-12" />
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex flex-col text-sm">
                      <span className="text-gray-500 italic">
                        By {post.author}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.updatedAt ? (
                          <>
                            Updated:{" "}
                            {post.updatedAt.toDate().toLocaleDateString()}
                          </>
                        ) : (
                          <>
                            Posted:{" "}
                            {post.createdAt.toDate().toLocaleDateString()}
                          </>
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
      <div className="mt-20">
        <Footer bgColor="#00704A" />
      </div>
    </div>
  );
};

export default BlogList;
