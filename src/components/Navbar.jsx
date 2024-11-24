import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { LogOut, Layout } from "lucide-react";
import user1 from '../assets/avatars/male-1.svg';

const DEFAULT_AVATAR = user1;

function Navbar({ user, email, userAvatar }) {
  let Links = [
    { name: "PLANT TREES", link: "/home/plant-trees" },
    { name: "CLIMATE CHANGE", link: "/home/climate-change" },
    { name: "SAVE THE OCEAN", link: "/home/save-the-ocean" },
    { name: "BLOG", link: "/home/blog" },
  ];

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="px-4">
      <div className="fixed inset-x-0 top-0 z-50 mx-auto max-w-6xl md:w-[98%] w-full border border-gray-100 bg-white/80 py-2 shadow backdrop-blur-lg md:top-6 md:rounded-3xl">
        <div className="md:flex items-center justify-between px-6">
          <div className="flex justify-between items-center">
            <Link
              to="/home"
              className="font-extrabold text-2xl cursor-pointer text-[#2C7865] flex items-center md:gap-2"
            >
              <i className="fas fa-globe-americas"></i>
              <span className="md:inline ml-2 md:ml-0 md:mr-0 mr-2">Our </span>
              <span>Earth</span>
            </Link>
            <div className="md:hidden flex justify-end w-full">
              <div
                onClick={handleToggle}
                className="block cursor-pointer w-7 h-7"
              >
                {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
              </div>
            </div>
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-8 md:static md:z-auto w-full md:w-auto md:pl-0 transition-all duration-500 ease-in ${
              open ? "block" : "hidden"
            }`}
          >
            {Links.map((link, index) => (
              <li key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
                <Link
                  to={link.link}
                  className="text-gray-800 font-extrabold hover:text-[#2C7865] duration-500"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="block md:hidden font-semibold w-full mb-6">
              <Link
                to="/home/dashboard"
                className="btn bg-slate-800 w-full text-white text-base px-3 py-1 rounded-xl duration-500"
              >
                User Dashboard
              </Link>
            </li>
            <li className="block md:hidden font-semibold w-full">
              <button
                onClick={handleSignOut}
                className="btn btn-success bg-[#2C7865] w-full text-base text-white px-3 py-1 rounded-xl duration-500"
              >
                Log Out
              </button>
            </li>
            <li className="dropdown dropdown-bottom dropdown-end hidden md:block">
              <div tabIndex={0} role="button">
                <div className="online placeholder ml-4">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="Profile"
                      className="w-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = DEFAULT_AVATAR;
                      }}
                    />
                  ) : (
                    <img
                      src={DEFAULT_AVATAR}
                      alt="Profile"
                      className="w-12 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-50 w-64 menu shadow-lg bg-slate-50 rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className="px-6 py-2 flex flex-wrap">
                  <p className="text-sm font-medium text-gray-700">Welcome, </p>
                  <p className="text-sm text-emerald-600 font-semibold truncate">
                    {email}
                  </p>
                </div>

                <li className="px-2 py-2 hover:bg-gray-50">
                  <Link
                    to="/home/dashboard"
                    className="flex hover:bg-transparent !active:bg-transparent items-center gap-3"
                  >
                    <Layout className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 active:text-gray-200 !active:bg-transparent">
                      User Dashboard
                    </span>
                  </Link>
                </li>

                <li className="px-2 py-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Log Out</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
