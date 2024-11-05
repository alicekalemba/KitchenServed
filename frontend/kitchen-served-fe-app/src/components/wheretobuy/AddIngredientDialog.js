import React from 'react';
import Dialog from '../common/Dialog';

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
            {/* Store Selection */}
          <select
            className="w-full p-2 border rounded"
            value={newIngredient.store_id}
            onChange={(e) => setNewIngredient({ ...newIngredient, store_id: e.target.value })}
            required
          >
            <option value="">Select store</option>
            <option value="1">Vons</option>
            <option value="2">Costco</option>
            <option value="3">Hannam</option>
          </select>

          {/* Ingredient Name */}
          <input
            className="w-full p-2 border rounded"
            placeholder="Ingredient Name"
            value={newIngredient.name}
            onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
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
