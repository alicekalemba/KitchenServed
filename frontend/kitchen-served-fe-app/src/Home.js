import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeCard } from './components/common/Recipe';
import { ChefHat, Plus } from 'lucide-react';
import { getTimeOfDay } from "./utils/timeUtils";
import AddRecipeDialog from './components/home/AddRecipeDialog';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [mealType, setMealType] = useState('');
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    meal_id: '',
    recipe_name: '',
    ingredients: '',
    cooking_time: ''
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const now = new Date();
      const localTimeString = now.toLocaleString('sv-SE', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
      const [datePart, timePart] = localTimeString.split(' ');
      const timeZoneOffset = now.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(timeZoneOffset / 60)).toString().padStart(2, '0');
      const offsetMinutes = (Math.abs(timeZoneOffset) % 60).toString().padStart(2, '0');
      const offsetSign = timeZoneOffset > 0 ? '-' : '+';
      const localISOString = `${datePart}T${timePart}${offsetSign}${offsetHours}:${offsetMinutes}`;

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/recipes?time_now=${localISOString}`);
        setRecipes(response.data);
        if (response.data.length > 0) {
          setMealType(response.data[0].meal_name);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      }
    };

    setTimeOfDay(getTimeOfDay());
    fetchRecipes();

    // Refresh recipes every hour
    const intervalId = setInterval(fetchRecipes, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  const backgroundImages = {
    morning: '/morning.jpg',
    afternoon: '/afternoon.jpg',
    evening: '/evening.jpg',
  };

  const handleAddRecipe = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/recipes`, newRecipe);
      setRecipes([...recipes, response.data]);
      setIsAddRecipeOpen(false);
      setNewRecipe({ meal_id: '', recipe_name: '', ingredients: '', cooking_time: '' });
      toast.success('Recipe added successfully!', {
        duration: 3000,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Failed to add recipe. Please try again.', {
        duration: 5000,
        position: 'top-center',
      });
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}`);
      setRecipes(recipes.filter(recipe => recipe.recipe_id !== recipeId));
      toast.success('Recipe deleted successfully!', {
        duration: 3000,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Failed to delete recipe. Please try again.', {
        duration: 5000,
        position: 'top-center',
      });
    }
  };

  return (
      <>
        <Toaster />
        <div className="relative min-h-screen overflow-hidden">
          {/* Background image */}
          <div
              className="absolute top-0 left-0 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImages[timeOfDay]})`,
                height: '35vh'
              }}
          />

          {/* Wavy separator */}
          <svg className="absolute left-0 w-full" style={{ top: 'calc(35vh - 2px)' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
                fill="#fff"
                d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,64C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>

          {/* Content */}
          <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 pb-20">
            {/* Greeting card */}
            <div className="max-w-3xl mx-auto bg-white bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <ChefHat className="w-12 h-12 text-yellow-500 mr-4 animate-bounce"/>
                  <h1 className="text-4xl font-bold text-white">Good {timeOfDay}!</h1>
                </div>
                <h2 className="text-3xl font-semibold mb-4 text-white animate-pulse">Let's cook something delicious</h2>
                <p className="text-xl text-white">Here are your {mealType} options.</p>
              </div>
            </div>

            {/* Recipe cards */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold mb-4">{mealType} Recipes</h3>
              {recipes && recipes.length > 0 ? (
                  recipes.map((recipe, index) => (
                      <div key={index} className="mb-6 transform hover:scale-105 transition-transform duration-200">
                        <RecipeCard recipe={recipe} onDelete={handleDeleteRecipe}/>
                      </div>
                  ))
              ) : (
                  <p className="text-center text-white bg-gray-800 bg-opacity-50 p-4 rounded">No recipes available at the moment.</p>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button for Adding Recipe */}
        <button
            onClick={() => setIsAddRecipeOpen(true)}
            className="fixed right-6 bottom-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300 group z-50"
        >
          <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
          <span className="ml-2 font-semibold hidden group-hover:inline">Add Recipe</span>
        </button>

        {/* Add Recipe Dialog */}
        <AddRecipeDialog
            isOpen={isAddRecipeOpen}
            onClose={() => setIsAddRecipeOpen(false)}
            onAddRecipe={handleAddRecipe}
            newRecipe={newRecipe}
            setNewRecipe={setNewRecipe}
        />
      </>
  );
};

export default Home;