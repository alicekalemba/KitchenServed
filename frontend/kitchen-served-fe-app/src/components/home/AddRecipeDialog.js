import React, { useState } from 'react';
import Dialog from '../common/Dialog';

const AddRecipeDialog = ({ isOpen, onClose, onAddRecipe, newRecipe, setNewRecipe }) => {
  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewRecipe({ ...newRecipe, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRecipe();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded"
            value={newRecipe.meal_id}
            onChange={(e) => setNewRecipe({ ...newRecipe, meal_id: parseInt(e.target.value) })}
            required
          >
            <option value="">Select meal type</option>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
          </select>
          <input
            className="w-full p-2 border rounded"
            placeholder="Recipe Name"
            value={newRecipe.recipe_name}
            onChange={(e) => setNewRecipe({ ...newRecipe, recipe_name: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            required
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Cooking Time (e.g., 10 min)"
            value={newRecipe.cooking_time}
            onChange={(e) => setNewRecipe({ ...newRecipe, cooking_time: e.target.value })}
            required
          />
          {/* Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddRecipeDialog;
