import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>404</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Oops! Page not found</p>
        <a 
          href="/" 
          style={{ 
            color: '#3498db', 
            textDecoration: 'underline',
            fontSize: '1rem'
          }}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
