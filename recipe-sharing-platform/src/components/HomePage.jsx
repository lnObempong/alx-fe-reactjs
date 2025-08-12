import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(recipe => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-600">{recipe.summary}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
