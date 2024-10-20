import React from 'react';

const MenuComponent = ({ recipes }) => {
  return (
      <div className="max-w-4xl mx-auto p-8 bg-[#f5e8d3]" style={{ backgroundImage: "url('/paper-texture.png')" }}>
        <div className="border-4 border-[#8B4513] p-6 rounded-lg">
          <div className="border-t-4 border-b-4 border-[#8B4513] py-6 mb-6">
            {recipes.map((recipe, index) => (
                <div key={index} className="flex justify-between items-center mb-4 pb-4 border-b border-[#8B4513] last:border-b-0">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#4a3728]">{recipe.recipe_name}</h3>
                    <p className="text-sm text-[#6b5744]">{recipe.ingredients}</p>
                  </div>
                  <div className="w-16 h-16 bg-gray-200 rounded-md ml-4"></div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default MenuComponent;
