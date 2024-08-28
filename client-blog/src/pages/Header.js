import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/context/AuthContext";
import TransitionWrapper from "../components/TransitionWrapper";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);

  const handleLogout = () => {
    setTransitioning(true);
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 300);
  };

  useEffect(() => {
    setTransitioning(false);
  }, [isAuthenticated]);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-xl rounded-full shadow-lg border-4 border-yellow-300 hover:from-yellow-500 hover:to-yellow-700 transition duration-300 mb-4 md:mb-0"
        >
          Wee CHAT
        </Link>

        <TransitionWrapper in={!transitioning}>
          {isAuthenticated ? (
            <span className="font-bold text-rose-400 text-2xl md:text-3xl transition-opacity duration-300 text-center md:text-left mb-4 md:mb-0">
              Welcome, {user?.name || "User"}!
            </span>
          ) : null}
        </TransitionWrapper>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 w-full md:w-auto mt-4 md:mt-0">
          <Link
            to="/"
            className="text-lg font-medium hover:text-blue-300 transition duration-300"
          >
            Post App
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium hover:text-blue-300 transition duration-300"
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg font-medium hover:text-blue-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
