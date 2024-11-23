/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import { auth } from "../../firebase";

export const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [error, setError] = useState(null); 

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log("SignUpError:", error.code); 
        let errorMessage = "An error occurred. Please try again.";
        if (error.code === 'auth/weak-password') {
          errorMessage = "The password is too weak.";
        } else if (error.code === 'auth/email-already-in-use') {
          errorMessage = "The email address is already in use.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "Invalid email address.";
        }
        setError(errorMessage);
      });
  };

  const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log("SignInError:", error.code); 
        let errorMessage = "An error occurred. Please try again.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = "Invalid email or password.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "Invalid email address.";
        }
        setError(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message); 
      });
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (isSignUpActive) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  useEffect(() => {
    if (user) {
      toast.success("Welcome!", { position: "top-right" });
    }
    if (error) {
        toast.error(error, { position: "top-right" });
    }
  }, [user, error]);

  if (user) {
    return <Navigate to="/home" />
  } 

  return (
    <div className="min-h-screen flex justify-center items-center bg-pattern">
      <div className="bg-white px-6 py-12 rounded-2xl shadow-xl border md:w-1/3 ">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-green-800">OUR EARTH 🌍</h2>
        <form onSubmit={handleSubmit}>
          {isSignUpActive && <legend className="font-extrabold text-center text-2xl text-[#496989] mb-6">Register</legend>}
          {!isSignUpActive && <legend className="font-extrabold text-center text-2xl text-[#496989] mb-6">Login</legend>}
          {isSignUpActive && (
            <div className="flex items-center rounded-md mb-4 gap-2 border">
              <div className="border-r-2 py-2 px-3">
                <i className="fas fa-user text-green-600"></i>
              </div>
              <input className="pl-2 outline-none border-none w-full" type="text" name="name" id="name" onChange={handleNameChange} placeholder="Name" required />
             </div>
          )}
          <div className="flex items-center rounded-md mb-4 gap-2 border">
            <div className="border-r-2 py-2 px-3">
              <i className="fa fa-at text-green-600"></i>
            </div>
            <input className="pl-2 outline-none border-none w-full" type="email" name="email" id="email" onChange={handleEmailChange} placeholder="Email" required />
          </div>
          <div className="flex items-center rounded-md mb-4 gap-2 border">
            <div className="border-r-2 py-2 px-3">
              <i className="fa fa-lock text-green-600"></i>
            </div>
            <input className="pl-2 outline-none border-none w-full" type="password" name="password" id="password" onChange={handlePasswordChange} placeholder="Password" required />
          </div>
          
          {isSignUpActive && (
            <button className="bg-green-600 btn btn-success py-2 w-full rounded-xl mt-6 flex justify-center items-center text-sm hover:scale-105 duration-300 font-bold text-white" onClick={handleSignUp}>
              Sign Up
            </button>
          )}
          {!isSignUpActive && (
            <button className="bg-green-600 btn btn-success py-2 w-full rounded-xl mt-6 flex justify-center items-center text-sm hover:scale-105 duration-300 font-bold text-white" onClick={handleSignIn}>
              Sign In
            </button>
          )}
          {/* Google Sign In Button */}
          <button onClick={handleGoogleSignIn} className="bg-white border border-green-600 py-2 w-full rounded-xl mt-6 flex justify-center items-center text-sm hover:scale-105 duration-300 font-bold text-green-600">
            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Login with Google
          </button>
          {isSignUpActive && (
            <span onClick={handleMethodChange} className="text-green-600 font-bold text-lg block text-center mt-8">
            Already have an account? <span onClick={handleMethodChange} className="underline cursor-pointer  text-[#1679AB] font-extrabold">Log In</span>
            </span>
          )}
          {!isSignUpActive && (
            <p className="text-green-600 font-bold text-lg block text-center mt-8">
              Don't have an account? <span onClick={handleMethodChange} className="underline cursor-pointer  text-[#1679AB] font-extrabold">Sign Up</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};