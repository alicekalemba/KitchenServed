import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IngredientCard = ({ ingredient }) => (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-bold">{ingredient.name}</h3>
      <p>Price: ${ingredient.price}</p>
      <a
        href={ingredient.store_location}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {ingredient.store_name}
      </a>
    </div>
);

const Stores = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);

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
    </div>
  );
};

export default Stores;
