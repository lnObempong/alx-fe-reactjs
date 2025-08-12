import { useParams, Link } from "react-router-dom";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Recipe not found</h2>
        <Link to="/" className="text-blue-500">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg shadow-lg mb-6" />
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-700 mb-6">{recipe.summary}</p>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside">
          {recipe.instructions?.map((step, index) => (
            <li key={index} className="text-gray-600 mb-2">{step}</li>
          ))}
        </ol>
      </div>

      <Link to="/" className="inline-block mt-6 text-blue-500">← Back to Recipes</Link>
    </div>
  );
}
