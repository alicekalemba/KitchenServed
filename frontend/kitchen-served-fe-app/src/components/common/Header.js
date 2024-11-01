import React from 'react';
import { Utensils } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
      <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center group">
            <Utensils className="w-8 h-8 text-yellow-500 mr-2 transition-transform duration-200 group-hover:rotate-12" />
            <span className="text-2xl font-bold">KitchenServed</span>
          </NavLink>

          {/* Navigation Links */}
          <nav className="space-x-4">
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
      </div>
    </header>
  );
};