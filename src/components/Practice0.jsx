// Practice0.jsx

import Loader from './Loader';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Practice1 from './Practice1';
import Footer from './Footer';

import '../styles/practice0.css';
import sparklesIcon from '../assets/sparkles.svg';
import xMarkIcon from '../assets/xMark.svg';

const Practice0 = () => {
  const navigate = useNavigate();
  const [currentPractice, setCurrentPractice] = useState(null);
  const [practiceDetails, setPracticeDetails] = useState({ fulltitle: [], screen: '' });
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const playOptions = [
    { title: 'Tables', subtitle: '(20x20)', screen: 'Tables20x20' },
    { title: 'Squares', subtitle: '(30)', screen: 'Squares30' },
    { title: 'Cubes', subtitle: '(12)', screen: 'Cubes12' },
    { title: 'Powers of 2', subtitle: '(12)', screen: 'Powersof2' },
    { title: 'Powers of 3', subtitle: '(6)', screen: 'Powersof3' },
    { title: 'Reciprocals', subtitle: '(12)', screen: 'Reciprocals12' },
  ];

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handlePracticeClick = (option) => {
    setPracticeDetails({ fulltitle: [option.title, option.subtitle], screen: option.screen });
    setCurrentPractice('Practice1');
  };

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  if (!isPageLoaded) {
    return <Loader />;
  }

  return (
    currentPractice === 'Practice1' ? (
      <Practice1
        fulltitle={practiceDetails.fulltitle}
        screen={practiceDetails.screen}
        onBackButtonClick={() => setCurrentPractice(null)}
      />
    ) : (
      <>
        <div className="practice0-container">
          <div className='practice0-subcontainer'>
            <div className="practice0-main-title">
              <img src={sparklesIcon} alt="Sparkles" />
              <h1>Math<span>In</span></h1>
              <img src={sparklesIcon} alt="Sparkles" />
            </div>

            <button className="practice0-close-btn" onClick={handleClose}>
              <img src={xMarkIcon} alt="Close" />
            </button>
          </div>

          <button
            onClick={() => handlePracticeClick({ title: 'Practice', subtitle: '(Full)', screen: 'Practice(Full)' })}
            className='practice0-subtitle-btn'
          >
            Practice (Full)
          </button>

          <div className="practice0-play-options">
            {playOptions.map((option) => (
              <button
                key={option.screen}
                onClick={() => handlePracticeClick(option)}
                className="practice0-button"
              >
                {option.title}&nbsp;{option.subtitle}
              </button>
            ))}
          </div>
        </div>

        <Footer />
      </>
    )
  );
};

Practice0.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Practice0;