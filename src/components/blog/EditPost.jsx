import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage, ref, uploadBytes, getDownloadURL } from "../../firebase";
import { Camera, Loader2, X, ArrowLeft, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setContent(postData.content);
          setImageUrl(postData.imageUrl || "");
        } else {
          setError("Post not found");
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
      setLoading(true);

      let updatedImageUrl = imageUrl;
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        updatedImageUrl = await getDownloadURL(imageRef);
      }

      await updateDoc(doc(db, "posts", id), {
        title,
        content,
        imageUrl: updatedImageUrl,
        updatedAt: new Date(),
      });

      toast.success("Post updated successfully!", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/home/blog");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update post", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageUrl("");
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/home/blog")}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-pattern overflow-x-hidden py-12 px-4 sm:px-6 lg:px-8 pb-20"
      >
        <Toaster />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto bg-white/80 mt-24 rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="flex px-8 pt-8 items-center bg-white/80">
            <button
              onClick={() => navigate("/home/blog")}
              className="flex items-center font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </button>
          </div>

          <motion.div
            className="bg-white/80 p-8 shadow-lg overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-extrabold text-gray-900 text-center mb-2"
            >
              Edit Post
            </motion.h1>

            <form onSubmit={handleUpdate} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 transition focus:border-green-800 bg-white/80 duration-200 ease-in-out"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 transition focus:border-green-800 bg-white/80 duration-200 ease-in-out"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <label className="block text-md font-semibold text-gray-700">
                  Image
                </label>

                <AnimatePresence mode="wait">
                  {!imageUrl ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                        accept="image/*"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-green-900 focus:outline-none"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Camera className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Click to upload image
                          </span>
                        </div>
                      </label>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-end"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    flex items-center justify-center px-6 py-3 rounded-lg
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-slate-800 hover:bg-slate-900 active:bg-slate-800"
                    }
                    text-white font-medium transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2
                  `}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Update Post
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer bgColor="#00704A" />
    </div>
  );
};

export default EditPost;
