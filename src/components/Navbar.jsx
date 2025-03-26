import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  let location = { pathname: '/' };
  try {
    location = useLocation();
  } catch (error) {
    console.log('Router context not available, using default location');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
        {/* <div className="flex items-center space-x-2"> */}
        <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-lg shadow-md">
    V
  </div>
          <span className="text-xl font-bold">DigiVoter</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition ${isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
          >
            Home
          </Link>
          <Link 
            to="/signup" 
            className={`font-medium transition ${isActive('/registration') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
          >
            Registration
          </Link>
          <Link 
            to="/verification" 
            className={`font-medium transition ${isActive('/verification') ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
          >
            Verification
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {location.pathname !== '/signin' && location.pathname !== '/signup' && (
            <Link 
              to="/signin" 
              className="font-medium text-foreground/80 hover:text-foreground transition"
            >
              Sign In
            </Link>
          )}

          {location.pathname === '/signin' && (
            <Link 
              to="/signup" 
              className="btn-primary"
            >
              Sign Up
            </Link>
          )}

          {location.pathname === '/signup' && (
            <Link 
              to="/signin" 
              className="btn-primary"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
