import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Meals from './Meals';
import Stores from './Stores';
import { Utensils } from 'lucide-react';

const Header = () => (
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        © {currentYear} Kitchen Served. All rights reserved.
      </div>
    </footer>
  );
};

const App = () => {
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/stores" element={<Stores />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
};

export default App;
