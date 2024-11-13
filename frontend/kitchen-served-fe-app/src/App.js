import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Meals from './Meals';
import Stores from './Stores';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

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
