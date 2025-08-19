import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div>
      <h2>Profile</h2>
      <nav style={{ marginBottom: 12 }}>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
