import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import UserProfile from './components/UserProfile';
import ProfilePage from './ProfilePage';
import UserContext from './components/UserContext'; // Import the UserContext

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // Original state for the counter
  const [count, setCount] = useState(0);

  // User data to be provided to the context
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <div className="App">
      {/* Provide the userData context to the rest of the app */}
      <UserContext.Provider value={userData}>
        <Header />
        <WelcomeMessage />
        <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
        <MainContent />
        <ProfilePage /> {/* ProfilePage now receives context data */}
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;