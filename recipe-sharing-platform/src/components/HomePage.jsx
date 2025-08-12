import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Failed to load recipes:', err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 cursor-pointer">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-md mb-3 w-full h-40 object-cover"
            />
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-600">{recipe.summary}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
