import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeCard } from './components/common/RecipeCard';
import { getMealTypeByTime } from "./utils/timeUtils";
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AddRecipeDialog from './components/home/AddRecipeDialog';

const Meals = () => {
  const [mealType, setMealType] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    meal_id: '',
    recipe_name: '',
    ingredients: '',
    cooking_time: ''
  });

  const backgroundImages = {
    morning: '/morning.jpg',
    afternoon: '/afternoon.jpg',
    evening: '/evening.jpg',
  };

  const currentTimeOfDay = getMealTypeByTime().toLowerCase();

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

  const handleAddRecipe = async () => {
    const formData = new FormData();
    formData.append("recipe_name", newRecipe.recipe_name);
    formData.append("meal_id", newRecipe.meal_id);
    formData.append("ingredients", newRecipe.ingredients);
    formData.append("cooking_time", newRecipe.cooking_time);

    if (newRecipe.image) {
      formData.append("image", newRecipe.image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recipes`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRecipes([...recipes, response.data]);
      setIsAddRecipeOpen(false);
      setNewRecipe({ meal_id: '', recipe_name: '', ingredients: '', cooking_time: '' });
      toast.success('Recipe added successfully!');
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image and wavy separator */}
      <div
        className="absolute top-0 left-0 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImages[currentTimeOfDay]})`,
          height: '35vh'
        }}
      />

      <svg className="absolute left-0 w-full" style={{ top: 'calc(35vh - 2px)' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path fill="#fff" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,64C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>

      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 pb-20">
        <Toaster />
        <h2 className="text-2xl font-bold mb-4">Choose a Meal</h2>

        {/* Meal Type Buttons with Highlight */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
            <button
              key={meal}
              onClick={() => fetchRecipes(meal)}
              className={`p-4 rounded shadow hover:bg-gray-300 transition ${
                mealType === meal ? 'bg-yellow-300 font-bold' : 'bg-gray-200'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>

        {/* Recipes Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">{mealType} Recipes</h3>
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="mb-6 transform hover:scale-105 transition-transform duration-200">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="text-center bg-gray-800 bg-opacity-50 p-4 rounded text-white">No recipes available at the moment.</p>
          )}
        </div>
      </div>



      {/* Add Recipe Dialog */}
      {isAddRecipeOpen && (
        <AddRecipeDialog
          isOpen={isAddRecipeOpen}
          onClose={() => setIsAddRecipeOpen(false)}
          onAddRecipe={handleAddRecipe}
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
        />
      )}
    </div>
  );
};

export default Meals;
