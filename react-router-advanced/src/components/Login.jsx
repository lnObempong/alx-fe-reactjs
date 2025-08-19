import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const handleLogin = () => {
    login();
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      <p>This is a fake login. Click to proceed.</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}
