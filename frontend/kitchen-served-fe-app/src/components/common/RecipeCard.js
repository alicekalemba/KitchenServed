import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';

export const RecipeCard = ({ recipe, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const placeholderImage = '/dome.jpg';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    onDelete(recipe.recipe_id);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex items-center relative">
      {/* Recipe Details */}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{recipe.recipe_name}</h3>
        <p>Ingredients: {recipe.ingredients}</p>
        <p>Cooking Time: {recipe.cooking_time}</p>
      </div>

      {/* Image Section on the Right */}
      <div className="w-1/5 ml-4">
        <img
          src={recipe.image_url ? `https://kitchen-served-images.s3.us-east-2.amazonaws.com/${recipe.image_url}` : placeholderImage}
          alt={recipe.recipe_name}
          className="w-full h-40 object-cover rounded"
        />
      </div>

      {/* Options Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <MoreVertical size={20} />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <ul className="py-1">
              <li>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
