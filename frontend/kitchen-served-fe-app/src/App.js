import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importing React Router
import Home from './Home';  // Import Home component
import Meals from './Meals';  // Import MealsScreen component

const Header = () => (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">KITCHEN SERVED</div>
      <nav>
        <Link to="/" className="mx-2 hover:text-gray-300">Home</Link>
        <Link to="/meals" className="mx-2 hover:text-gray-300">Meals</Link>
        <Link to="/wheretobuy" className="mx-2 hover:text-gray-300">Where To Buy</Link>
      </nav>
    </header>
);

const Footer = () => (
    <footer className="p-4 bg-gray-800 text-white text-center">
      Constant Footer
    </footer>
);

export const RecipeCard = ({ recipe }) => (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold">{recipe.recipe_name}</h3>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Cooking Time: {recipe.cooking_time}</p>
    </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
