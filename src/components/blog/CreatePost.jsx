import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera, Loader2, X } from "lucide-react";
import Footer from "../Footer";

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) return;

    try {
      setLoading(true);

      let imageURL = "";
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
      }

      const postData = {
        title,
        content,
        imageUrl: imageURL,
        author: user.email,
        createdAt: new Date(),
      };

      await Promise.all([
        addDoc(collection(db, "posts"), postData),
        imageURL && imageURL !== "" ? imageURL : null,
      ]);

      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);
      setLoading(false);
      toast.success("Post created successfully!", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/home/blog");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error("Failed to create post", {
        duration: 3000,
        position: "top-center",
      });
    }
  };

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
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white/90 mt-24 rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="px-8 py-6">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-extrabold text-gray-900 text-center mb-8"
            >
              Create New Post
            </motion.h1>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 transition focus:border-green-800 bg-white/80 duration-200 ease-in-out"
                  placeholder="Enter your post title..."
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
                  required
                  rows="6"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 transition focus:border-green-800 bg-white/80 duration-200 ease-in-out"
                  placeholder="Write your post content..."
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

                {!preview ? (
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full h-32 px-4 transition bg-white/80 border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-green-900 focus:outline-none"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Camera className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Click to upload image
                        </span>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={preview}
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
                  </div>
                )}
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.div>
              )}

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
                      : "bg-slate-800 hover:bg-slate-800 active:bg-slate-900"
                  }
                  text-white font-medium transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2
                `}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating Post...
                    </>
                  ) : (
                    "Create Post"
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
      <Footer bgColor="#00704A" />
    </div>
  );
};

export default CreatePost;
