import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';

const IngredientCard = ({ ingredient, onDelete }) => {
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
    console.log('Ingredient is', JSON.stringify(ingredient, null, 2));
    onDelete(ingredient.ingredient_id);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex items-center relative">
      {/* Recipe Details */}
      <div className="flex-1">
        <div>
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
      </div>

      {/* Image Section on the Right */}
      <div className="w-1/5 ml-4">
        <img
          src={
            ingredient.image_url
              ? `https://kitchen-served-images.s3.us-east-2.amazonaws.com/${ingredient.image_url}`
              : placeholderImage
          }
          alt={ingredient.name}
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

export default IngredientCard;
