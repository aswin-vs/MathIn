// Homepage.jsx

import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './Footer';

import '../styles/homepage.css';
import sparklesIcon from '../assets/sparkles.svg';
import prepareIcon from '../assets/prepare.svg';
import practiceIcon from '../assets/practice.svg';
import participateIcon from '../assets/participate.svg';

const Homepage = () => {
  const navigate = useNavigate();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const options = [
    { label: 'Prepare', icon: prepareIcon, path: '/prepare' },
    { label: 'Practice', icon: practiceIcon, path: '/practice' },
    { label: 'Participate', icon: participateIcon, path: '/participate' }
  ];

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  if (!isPageLoaded) {
    return <Loader />;
  }

  return (
    <>
      <div className="homepage-container">
        <div className="homepage-main-title">
          <img src={sparklesIcon} alt="Sparkles" />
          <h1>Math<span>In</span></h1>
          <img src={sparklesIcon} alt="Sparkles" />
        </div>

        <h2 className="homepage-sub-title">Math at Ease!</h2>

        <div className="homepage-options">
          {options.map((option) => (
            <button
              key={option.label}
              className="homepage-options-btn"
              onClick={() => navigate(option.path, { replace: true })}
            >
              <img src={option.icon} alt={`${option.label} Icon`} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Homepage;