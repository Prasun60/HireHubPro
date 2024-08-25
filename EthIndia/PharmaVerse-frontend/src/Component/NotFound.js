// NotFound.js
import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import your custom CSS file
import Logo from "../Images/logoPharma.png";

const NotFound = () => {
  return (
    <Container maxWidth="md" className="not-found-container">
      <div className="logo-container">
        <img
          src={Logo}
          alt="Logo"
          width="400"
          height="100"
          className="logo-image"
        />
      </div>
      <Typography variant="h2" className="not-found-title" color="white" sx={{fontWeight:700}}>
        404
      </Typography>
      <Typography
        variant="h4"
        className="not-found-subtitle"
        color="white"
        sx={{ marginBottom: '8px',fontWeight:700 }}
      >
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        className="not-found-message"
        color="white"
        sx={{ marginBottom: '24px',fontWeight:700 }}
      >
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button
        variant="contained"
        color="success"
        component={Link}
        to="/"
        className="not-found-button"
        sx={{ marginTop: '12px' }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
