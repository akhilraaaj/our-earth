import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './components/auth/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Landing from "./components/Landing";
import Climate from './components/content/Climate';
import PlantTrees from './components/content/PlantTrees';
import Ocean from './components/content/Ocean';
import Page404 from './components/Page404';
import Navbar from './components/Navbar';
import Loading from './components/content/Loading';
import BlogList from './components/blog/BlogList';
import CreatePost from './components/blog/CreatePost';
import EditPost from './components/blog/EditPost';
import UserProfile from './components/content/UserProfile';
import user1 from './assets/avatars/male-1.svg';
import ScrollToTop from './components/ScrollToTop';

const DEFAULT_AVATAR = user1;

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [userAvatar, setUserAvatar] = useState('');

  const fetchUserAvatar = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const profilePic = userDoc.data().profilePic;
        if (profilePic) {
          setUserAvatar(profilePic);
        } else {
          setUserAvatar(DEFAULT_AVATAR);
        }
      } else {
        setUserAvatar(DEFAULT_AVATAR);
      }
    } catch (error) {
      console.error("Error fetching user avatar:", error);
      setUserAvatar(DEFAULT_AVATAR);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        setEmail(user.email);
        await fetchUserAvatar(user.uid);
      } else {
        setUserAvatar(DEFAULT_AVATAR);
      }
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateUserAvatar = async (newAvatar) => {
    setUserAvatar(newAvatar);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className='w-full h-full m-0 p-0'>
      <AnimatePresence>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/home/*" element={
              <ProtectedRoute user={user}>
                <Navbar user={user} email={email} userAvatar={userAvatar || DEFAULT_AVATAR} />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/climate-change" element={<Climate />} />
                  <Route path="/plant-trees" element={<PlantTrees />} />
                  <Route path="/save-the-ocean" element={<Ocean />} />
                  <Route path="/blog" element={<BlogList user={user} />} />
                  <Route path="/create-post" element={<CreatePost user={user} />} />
                  <Route path="/edit/:id" element={<EditPost user={user} />} />
                  <Route path="/dashboard" element={<UserProfile user={user} setUserAvatar={handleUpdateUserAvatar} currentAvatar={userAvatar}  />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;
