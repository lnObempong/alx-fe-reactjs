// src/services/github.js
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const token = import.meta.env.VITE_APP_GITHUB_TOKEN;

const headers = token
  ? { Authorization: `token ${token}` }
  : {};

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query },
      headers,
    });
    return response.data.items;
  } catch (error) {
    console.error('GitHub API error:', error);
    return [];
  }
};
