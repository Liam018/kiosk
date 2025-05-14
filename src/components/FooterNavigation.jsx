import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Home, Megaphone, Map, MessageSquareText, Eye, EyeOff } from 'lucide-react';

const FooterNavigation = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const userNav = [
    { label: 'Dashboard', path: '/user-dashboard', icon: Home },
    { label: 'Announcement', path: '/user-announcement', icon: Megaphone },
    { label: 'Map', path: '/user-campus-map', icon: Map },
    { label: 'Feedback', path: '/user-feedback', icon: MessageSquareText },
  ];

  const toggleNavVisibility = () => {
    setIsNavVisible((prev) => !prev);
  };

  return (
    <>
      <style>
        {`
          .nav-container {
            transition: transform 0.3s ease-in-out;
          }
          .nav-hidden {
            transform: translateY(100%);
            opacity: 0;
          }
          .toggle-button {
            transition: background-color 0.2s, color 0.2s;
          }
          .toggle-button:hover {
            background-color: #0d9488;
            color: white;
          }
        `}
      </style>
      <footer className="fixed bottom-5 w-full flex justify-center gap-10 pointer-events-none">
        <div
          className={`nav-container flex justify-center gap-10 ${!isNavVisible ? 'nav-hidden' : ''}`}
        >
          {userNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 shadow-lg border-2 rounded-full text-teal-800 font-semibold pointer-events-auto ${
                    isActive ? 'bg-teal-800 text-white border-white' : 'border bg-white border-teal-700 hover:bg-teal-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-2" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
        <button
          onClick={toggleNavVisibility}
          className="fixed bottom-5 right-5 p-2 shadow-lg border-2 rounded-full text-teal-800 bg-white border-teal-700 hover:bg-teal-800 hover:text-white pointer-events-auto toggle-button"
          aria-label={isNavVisible ? 'Hide navigation' : 'Show navigation'}
        >
          {isNavVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </footer>
    </>
  );
};

export default FooterNavigation;