import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeCard } from './App';  // Import RecipeCard

const Home = () => {
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
      <main className="flex-grow p-8" style={{ backgroundImage: backgroundImages[timeOfDay] }}>
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Hello!</h1>
          <h1 className="text-4xl font-bold mb-4">Let's Cook</h1>
          <h2 className="text-2xl mb-4">Good {timeOfDay}! Here are your {mealType} options:</h2>
          <div>
            {recipes && recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))
            ) : (
                <p>No recipes available at the moment.</p>
            )}
          </div>
        </div>
      </main>
  );
};

export default Home;
