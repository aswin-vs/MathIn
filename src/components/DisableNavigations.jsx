// DisableNavigations.jsx

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DisableNavigations = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return null;
};

export default DisableNavigations;