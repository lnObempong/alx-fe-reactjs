import React, { useState } from 'react';
import Search from './components/Search';

const App = () => {
  const [userData, setUserData] = useState(null);

  return (
    <div>
      <Search onUserData={setUserData} />
      {userData && (
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <img src={userData.avatar_url} alt="avatar" width={100} />
        </div>
      )}
    </div>
  );
};

export default App;
