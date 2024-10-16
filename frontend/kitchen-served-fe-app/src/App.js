import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import axios from 'axios';

const Header = ({ onHomeClick, onMealsClick, onWhereToBuyClick }) => (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">KITCHEN SERVED</div>
      <nav>
        <button onClick={onHomeClick} className="mx-2 hover:text-gray-300">Home</button>
        <button onClick={onMealsClick} className="mx-2 hover:text-gray-300">Meals</button>
        <button onClick={onWhereToBuyClick} className="mx-2 hover:text-gray-300">Where To Buy</button>
      </nav>
    </header>
);

const Footer = () => (
    <footer className="p-4 bg-gray-800 text-white text-center">
      Constant Footer
    </footer>
);

const RecipeCard = ({ recipe }) => (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold">{recipe.recipe_name}</h3>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Cooking Time: {recipe.cooking_time}</p>
    </div>
);

const App = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [mealType, setMealType] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      const now = new Date();
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recipes?time_now=${now.toISOString()}`);
        setRecipes(response.data);
        if (response.data.length > 0) {
          setMealType(response.data[0].meal_name);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      }
    };

    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setTimeOfDay('morning');
      } else if (hour < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };

    updateTimeOfDay();
    fetchRecipes();

    // Refresh recipes every hour
    const intervalId = setInterval(fetchRecipes, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  const backgroundImages = {
    morning: 'url("/morning.jpg")',
    afternoon: 'url("/afternoon.jpg")',
    evening: 'url("/evening.jpg")',
  };

  return (
      <div className="min-h-screen flex flex-col" style={{ backgroundImage: backgroundImages[timeOfDay] }}>
        <Header
            onHomeClick={() => console.log('Home clicked')}
            onMealsClick={() => console.log('Meals clicked')}
            onWhereToBuyClick={() => console.log('Where To Buy clicked')}
        />
        <main className="flex-grow p-8">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4">Hello!</h1>
            <h1 className="text-4xl font-bold mb-4">Let's Cook</h1>
            <h2 className="text-2xl mb-4">Good {timeOfDay}! Here are
              your {mealType} options:</h2>
            <div>
              {recipes && recipes.length > 0 ? (
                  recipes.map((recipe, index) => (
                      <RecipeCard key={index} recipe={recipe}/>
                  ))
              ) : (
                  <p>No recipes available at the moment.</p>
              )}
            </div>
          </div>
        </main>
        <Footer/>
      </div>
  );
};

export default App;