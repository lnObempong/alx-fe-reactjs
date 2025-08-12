import React, { useState } from 'react';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    } else if (ingredients.split(',').filter(i => i.trim()).length < 2) {
      newErrors.ingredients = 'Please enter at least two ingredients, separated by commas.';
    }
    if (!steps.trim()) newErrors.steps = 'Preparation steps are required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Here you would normally submit the data to backend or update state
      alert('Recipe added successfully!');
      
      // Reset form
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Recipe</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-medium">
          Recipe Title
        </label>
        <input
          id="title"
          type="text"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Spaghetti Carbonara"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="ingredients" className="block mb-1 font-medium">
          Ingredients <span className="text-gray-500 text-sm">(comma separated)</span>
        </label>
        <textarea
          id="ingredients"
          rows="4"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.ingredients ? 'border-red-500' : 'border-gray-300'
          }`}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. eggs, cheese, bacon, black pepper"
        />
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="steps" className="block mb-1 font-medium">
          Preparation Steps
        </label>
        <textarea
          id="steps"
          rows="6"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.steps ? 'border-red-500' : 'border-gray-300'
          }`}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Describe how to prepare the recipe..."
        />
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
