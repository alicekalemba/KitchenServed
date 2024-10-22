import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeCard } from './components/common/RecipeCard';
import {getMealTypeByTime} from "./utils/timeUtils";


const Meals = () => {
  const [mealType, setMealType] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (meal) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recipes?meal_name=${meal}`);
      setRecipes(response.data);
      setMealType(meal);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    const initialMealType = getMealTypeByTime();
    fetchRecipes(initialMealType);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Choose a Meal</h2>
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => fetchRecipes('Breakfast')}
          className="p-4 bg-gray-200 rounded shadow hover:bg-gray-300"
        >
          Breakfast
        </button>
        <button
          onClick={() => fetchRecipes('Lunch')}
          className="p-4 bg-gray-200 rounded shadow hover:bg-gray-300"
        >
          Lunch
        </button>
        <button
          onClick={() => fetchRecipes('Dinner')}
          className="p-4 bg-gray-200 rounded shadow hover:bg-gray-300"
        >
          Dinner
        </button>
      </div>

      {mealType && (
        <div className="mt-8">
          <h3 className="text-xl font-bold">{mealType} Recipes</h3>
          <div>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))
            ) : (
              <p>No recipes available for {mealType}.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Meals;
