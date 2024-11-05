import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AddIngredientDialog from './components/wheretobuy/AddIngredientDialog';
import { IngredientCard } from './components/wheretobuy/IngredientCard';


const Stores = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);  // State for Add Ingredient Dialog
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    price: '',
    store_id: ''
  });

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ingredients`);
        setIngredients(response.data);
        setFilteredIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(value) ||
      ingredient.price.toString().includes(value) ||
      ingredient.store_name.toLowerCase().includes(value)
    );

    setFilteredIngredients(filtered);
  };

  const handleAddIngredient = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/ingredients`, newIngredient);
    setIngredients([...ingredients, response.data]);
    setIsAddIngredientOpen(false);
    setNewIngredient({ name: '', price: '', store_id: '' });
    toast.success('Ingredient added successfully!', {
      duration: 3000,
      position: 'top-center',
    });
  } catch (error) {
    console.error('Error adding ingredient:', error);
    toast.error('Failed to add ingredient. Please try again.', {
      duration: 5000,
      position: 'top-center',
    });
  }
};


  const handleDeleteIngredient = async (ingredientId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/ingredients/${ingredientId}`);
      setIngredients(ingredients.filter(ingredient => ingredient.ingredient_id !== ingredientId));
      toast.success('Ingredient deleted successfully!', {
        duration: 3000,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      toast.error('Failed to delete ingredient. Please try again.', {
        duration: 5000,
        position: 'top-center',
      });
    }
  };


  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Available Ingredients</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, price, store..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <div>
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((ingredient, index) => (
            <IngredientCard key={index} ingredient={ingredient} />
          ))
        ) : (
          <p>No ingredients found.</p>
        )}
      </div>

      {/* Floating Action Button for Adding Ingredient */}
      <button
        onClick={() => setIsAddIngredientOpen(true)}
        className="fixed right-6 bottom-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300 group z-50"
      >
        <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        <span className="ml-2 font-semibold hidden group-hover:inline">Add Ingredient</span>
      </button>

      {/* Add Ingredient Dialog */}
      {isAddIngredientOpen && (
        <AddIngredientDialog
          isOpen={isAddIngredientOpen}
          onClose={() => setIsAddIngredientOpen(false)}
          onAddIngredient={handleAddIngredient}
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
        />
      )}
    </div>
  );
};

export default Stores;
