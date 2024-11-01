import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';
import TopSection from './components/TopSection';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Landing from "./components/Landing";
import Climate from './components/content/Climate';
import Deforestation from './components/content/Deforestation';
import Ocean from './components/content/Ocean';
import Page404 from './components/content/Page404';
import Navbar from './components/content/Navbar';
import Loading from './components/content/Loading';
import BlogList from './components/BlogList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import UserProfile from './components/UserProfile';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setEmail(user.email);
      }
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className='w-full h-full m-0 p-0'>
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopSection user={user} />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/home/*" element={
              <ProtectedRoute user={user}>
                <Navbar user={user} email={email} />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/Climate" element={<Climate />} />
                  <Route path="/Deforestation" element={<Deforestation />} />
                  <Route path="/Ocean" element={<Ocean />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/create-post" element={<CreatePost user={user} />} />
                  <Route path="/edit/:id" element={<EditPost user={user} />} />
                  <Route path="/dashboard" element={<UserProfile user={user} />} />
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
