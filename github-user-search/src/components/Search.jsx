// src/components/Search.jsx
import React, { useState } from 'react';
import { searchUsers } from '../services/github';

function Search() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchUsers(query);
    setUsers(results);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar_url} alt={user.login} width="40" />
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
