import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Meals from './Meals';
import Stores from './Stores';

const Header = () => (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
         <Link to="/">
           <button className="text-xl font-bold hover:text-gray-300">
             KITCHEN SERVED
           </button>
         </Link>
         <nav>
           <Link to="/" className="mx-2 hover:text-gray-300">Home</Link>
           <Link to="/meals" className="mx-2 hover:text-gray-300">Meals</Link>
           <Link to="/stores" className="mx-2 hover:text-gray-300">Where To Buy</Link>
         </nav>
        </div>
      </div>
    </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        © 2024 Kitchen Served. All rights reserved.
      </div>
    </footer>
);

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