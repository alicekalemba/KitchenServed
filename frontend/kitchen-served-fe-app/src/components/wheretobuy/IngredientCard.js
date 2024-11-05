import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';

export const IngredientCard = ({ ingredient }) => {
  return (
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
};