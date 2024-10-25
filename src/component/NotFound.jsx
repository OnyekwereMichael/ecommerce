import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
    color: '#333',
  },
  header: {
    fontSize: '72px',
    margin: '0 0 20px',
  },
  message: {
    fontSize: '24px',
    margin: '0 0 40px',
  },
  link: {
    fontSize: '18px',
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default NotFound;
