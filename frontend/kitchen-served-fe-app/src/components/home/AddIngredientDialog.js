import React from 'react';
import Dialog from './Dialog';

const AddIngredientDialog = ({ isOpen, onClose, onAddIngredient, newIngredient, setNewIngredient }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIngredient();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Add New Ingredient</h2>
        <div className="space-y-4">
          {/* Ingredient Name */}
          <input
            className="w-full p-2 border rounded"
            placeholder="Ingredient Name"
            value={newIngredient.ingredient_name}
            onChange={(e) => setNewIngredient({ ...newIngredient, ingredient_name: e.target.value })}
            required
          />

          {/* Price */}
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Price"
            value={newIngredient.price}
            onChange={(e) => setNewIngredient({ ...newIngredient, price: e.target.value })}
            required
          />

          {/* Store Selection */}
          <select
            className="w-full p-2 border rounded"
            value={newIngredient.store_name}
            onChange={(e) => setNewIngredient({ ...newIngredient, store_name: e.target.value })}
            required
          >
            <option value="">Select store</option>
            <option value="Vons">Vons</option>
            <option value="Costco">Costco</option>
            <option value="Hannam">Hannam</option>
          </select>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-green-600"
          >
            Add Ingredient
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddIngredientDialog;
