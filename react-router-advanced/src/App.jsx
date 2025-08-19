import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Home from "./components/Home";
import About from "./components/About";
import BlogPost from "./components/BlogPost";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileLayout from "./components/ProfileLayout";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSettings from "./components/ProfileSettings";

function Nav() {
  const { authed, logout } = useAuth();
  return (
    <nav style={{ marginBottom: 16 }}>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/blog/5">Blog #5</Link> | <Link to="/profile">Profile</Link>{" "}
      {authed && (
        <>
          {" | "}
          <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
          <h1>React Router Advanced</h1>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog/:id" element={<BlogPost />} />

            {/* Protected parent with nested children */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<ProfileDetails />} />
                <Route path="details" element={<ProfileDetails />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
