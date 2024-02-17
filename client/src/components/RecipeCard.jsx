import React from 'react';
import { Tilt } from 'react-tilt'

const RecipeCard = ({ recipe }) => {
  return (
    <Tilt>
    <div className="bg-slate-200 max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-lg mb-4 hover:shadow-lg transition duration-300">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semi-bold text-black mb-2 underline">{recipe.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{recipe.description}</p>
        <ul className="divide-y divide-gray-300">
          <li className="py-2">
            <span className="font-semibold text-gray-700">Calories:</span> {recipe.calories}
          </li>
          <li className="py-2">
            <span className="font-semibold text-gray-700">Carbohydrates PDV:</span> {recipe.carbohydrates_pdv}
          </li>
          <li className="py-2">
            <span className="font-semibold text-gray-700">Protein PDV:</span> {recipe.protein_pdv}
          </li>
          <li className="py-2">
            <span className="font-semibold text-gray-700">Saturated Fat PDV:</span> {recipe.saturated_fat_pdv}
          </li>
          <li className="py-2">
            <span className="font-semibold text-gray-700">Sodium PDV:</span> {recipe.sodium_pdv}
          </li>
          <li className="py-2">
            <span className="font-semibold text-gray-700">Sugar PDV:</span> {recipe.sugar_pdv}
          </li>
          <li className="py-2">
            <span className="font-semibold text-gray-700">Total Fat PDV:</span> {recipe.total_fat_pdv}
          </li>
        </ul>
      </div>
    </div>
    </Tilt>
  );
};

export default RecipeCard;
