import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center group">
            <Utensils className="w-8 h-8 text-yellow-500 mr-2 transition-transform duration-200 group-hover:rotate-12" />
            <span className="text-2xl font-bold">KitchenServed</span>
          </NavLink>

          {/* Hamburger Menu Icon (visible on small screens) */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                }`
              }
            >
              Meals
            </NavLink>
            <NavLink
              to="/stores"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                }`
              }
            >
              Where To Buy
            </NavLink>
          </nav>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <nav className="sm:hidden space-y-2 pb-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                }`
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/meals"
              className={({ isActive }) =>
                `block text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                }`
              }
              onClick={toggleMenu}
            >
              Meals
            </NavLink>
            <NavLink
              to="/stores"
              className={({ isActive }) =>
                `block text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
                }`
              }
              onClick={toggleMenu}
            >
              Where To Buy
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};
