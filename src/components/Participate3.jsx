// Participate3.jsx

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './Footer';

import '../styles/participate3.css';
import sparklesIcon from '../assets/sparkles.svg';
import xMarkIcon from '../assets/xMark.svg';
import correctIcon from '../assets/circleTick.svg';
import wrongIcon from '../assets/circleX.svg';

const Participate3 = ({ score, totalQuestions }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const scorePercentage = (score / totalQuestions) * 100;

  return (
    <>
      <div className="participate3-container">
        <div className='participate3-subcontainer1'>
          <div className="participate3-main-title">
            <img src={sparklesIcon} alt="SparklesIcon" />
            <h1>Math<span>In</span></h1>
            <img src={sparklesIcon} alt="SparklesIcon" />
          </div>

          <button className="participate3-close-btn" onClick={handleClose}>
            <img src={xMarkIcon} alt="CloseIcon" />
          </button>
        </div>

        <div className='participate3-subcontainer2'>
          <h2 className="participate3-header">MathIn Pro <span>- Certification</span></h2>

          {(scorePercentage >= 99) ?
            (<>
              <h1 className='participate3-subtitle1'>🎉 Kudos !</h1>
              <div className="participate3-subtitle2 blink-animation">
                <img className="participate3-icon" src={correctIcon} alt="CorrectIcon" />
                <span>Test Passed</span>
              </div>
              <div className="participate3-result">You scored &nbsp;{score} / {totalQuestions} &nbsp;&nbsp;<span>({scorePercentage} %)</span></div>
              <div className="participate3-certificate">
                <img src={sparklesIcon} alt='SparklesIcon' />&nbsp;
                <div>Your <span>MathIn Pro</span> certificate will be delivered to your mail shortly...</div>
              </div>
            </>) :

            (<>
              <h1 className='participate3-subtitle1'>🥺 Prepare well & try again !</h1>
              <div className="participate3-subtitle2 blink-animation">
                <img className="participate3-icon" src={wrongIcon} alt="WrongIcon" />
                <span>Test Failed</span>
              </div>
              <div className="participate3-result">You scored &nbsp;{score} / {totalQuestions} &nbsp;&nbsp;<span>({scorePercentage} %)</span></div>
            </>)}
        </div>
      </div>

      <Footer />
    </>
  );
};

Participate3.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default Participate3;