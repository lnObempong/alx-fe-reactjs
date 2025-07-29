import axios from "axios";

// Main advanced search function (used internally or directly)
export const fetchAdvancedUsers = async ({ username, location, minRepos }) => {
  const query = [];

  if (username) query.push(`${username} in:login`);
  if (location) query.push(`location:${location}`);
  if (minRepos) query.push(`repos:>=${minRepos}`);

  const queryString = query.join(" ");
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(queryString)}`;

  const response = await axios.get(url);
  return response.data;
};

// ✅ Wrapper function explicitly named fetchUserData as required
export const fetchUserData = async (params) => {
  return await fetchAdvancedUsers(params);
};
