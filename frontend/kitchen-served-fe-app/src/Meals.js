import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeCard } from './components/common/RecipeCard';
import { getMealTypeByTime } from './utils/timeUtils';
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
    cooking_time: '',
    image: null,
  });

  const fetchRecipes = async (meal) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipes?meal_name=${meal}`
      );
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
    formData.append('recipe_name', newRecipe.recipe_name);
    formData.append('meal_id', newRecipe.meal_id);
    formData.append('ingredients', newRecipe.ingredients);
    formData.append('cooking_time', newRecipe.cooking_time);


    if (newRecipe.image) {
      formData.append('image', newRecipe.image);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/recipes`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setRecipes([...recipes, response.data]);
      setIsAddRecipeOpen(false);
      setNewRecipe({
        meal_id: '',
        recipe_name: '',
        ingredients: '',
        cooking_time: '',
        image: null
      });
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

  const handleUpdateRecipePhoto = async (recipeId, file) => {
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}/upload-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const updatedRecipes = recipes.map((recipe) =>
        recipe.recipe_id === recipeId
          ? { ...recipe, image_url: response.data.image_url }
          : recipe
      );
      setRecipes(updatedRecipes);
  
      toast.success("Photo updated successfully!", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error updating recipe photo:", error);
      toast.error("Failed to update photo. Please try again.", {
        duration: 5000,
        position: "top-center",
      });
    }
  };
  

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}`
      );
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== recipeId));
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
    <div className="p-8">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 text-center">Choose a Meal</h2>
      <div className="grid grid-cols-3 gap-4 justify-center">
        <button
          onClick={() => fetchRecipes('Breakfast')}
          className={`p-4 rounded shadow hover:bg-gray-300 ${
            mealType === 'Breakfast' ? 'bg-yellow-200' : 'bg-gray-200'
          }`}
        >
          Breakfast
        </button>
        <button
          onClick={() => fetchRecipes('Lunch')}
          className={`p-4 rounded shadow hover:bg-gray-300 ${
            mealType === 'Lunch' ? 'bg-yellow-200' : 'bg-gray-200'
          }`}
        >
          Lunch
        </button>
        <button
          onClick={() => fetchRecipes('Dinner')}
          className={`p-4 rounded shadow hover:bg-gray-300 ${
            mealType === 'Dinner' ? 'bg-yellow-200' : 'bg-gray-200'
          }`}
        >
          Dinner
        </button>
      </div>

      {mealType && (
        <div className="mt-8 flex justify-center">
          <div className="max-w-3xl w-full">
            <h3 className="text-xl font-bold mb-4 text-center">
              {mealType} Recipes
            </h3>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="mb-6 transform hover:scale-105 transition-transform duration-200"
                >
                  <RecipeCard recipe={recipe} onDelete={handleDeleteRecipe} onUpdatePhoto={handleUpdateRecipePhoto} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No recipes available for {mealType}.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button for Adding Recipe */}
      <button
        onClick={() => setIsAddRecipeOpen(true)}
        className="fixed right-6 bottom-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300 group z-50"
      >
        <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        <span className="ml-2 font-semibold hidden group-hover:inline">
          Add Recipe
        </span>
      </button>

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
