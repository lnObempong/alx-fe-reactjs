import { Link } from 'react-router-dom';

const navStyle = {
  padding: '10px 20px',
  backgroundColor: '#333',
  display: 'flex',
  gap: '20px',
  justifyContent: 'space-between',  // <-- Add this line
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/about">About</Link>
      <Link style={linkStyle} to="/services">Services</Link>
      <Link style={linkStyle} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
