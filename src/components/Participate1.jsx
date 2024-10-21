// Participate1.jsx

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Participate2 from './Participate2';
import Footer from './Footer';

import '../styles/participate1.css';
import sparklesIcon from '../assets/sparkles.svg';
import xMarkIcon from '../assets/xMark.svg';
import arrowRightIcon from '../assets/arrowRight.svg';
import arrowLeftIcon from '../assets/arrowLeft.svg';
import tickOnIcon from '../assets/tickOn.svg';
import tickOffIcon from '../assets/tickOff.svg';

const Participate1 = ({ onBack }) => {
  const navigate = useNavigate();
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [showParticipate2, setShowParticipate2] = useState(false);

  useEffect(() => {
    const nameInput = document.getElementById('name-field');
    if (nameInput) {
      nameInput.focus();
    }
  }, []);

  const handleNameChange = (event) => {
    setNameValid(event.target.checkValidity());
  };

  const handleEmailChange = (event) => {
    setEmailValid(event.target.checkValidity());
  };

  const isFormValid = nameValid && emailValid;

  const handleProceed = () => {
    if (isFormValid) {
      setShowParticipate2(true);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    (showParticipate2) ? (<Participate2 />) :
      (<>
        <div className="participate1-container">
          <div className="participate1-subcontainer1">
            <button className='participate1-back-button' onClick={onBack} aria-label="Back">
              <img src={arrowLeftIcon} alt="BackIcon" />
            </button>

            <div className="participate1-main-title">
              <img src={sparklesIcon} alt="SparklesIcon" />
              <h1>Math<span>In</span></h1>
              <img src={sparklesIcon} alt="SparklesIcon" />
            </div>

            <button className="participate1-close-btn" onClick={handleClose} aria-label="Close">
              <img src={xMarkIcon} alt="CloseIcon" />
            </button>
          </div>

          <div className="participate1-subcontainer2">
            <h2 className="participate1-subtitle1">MathIn Pro <span>- Certification</span></h2>
            <h3 className="participate1-subtitle2">Kindly provide your name and email address to continue to the test</h3>
            <form>
              <div className="input-area">
                <label htmlFor="name-field">Name : </label>
                <input
                  type="text"
                  id="name-field"
                  className="input-field"
                  title="Enter your Name"
                  maxLength={32}
                  pattern="[a-zA-Z\s]+"
                  required
                  onChange={handleNameChange}
                />
                <span>
                  {!nameValid && <img className="validation-tick" src={tickOffIcon} alt="TickOff" />}
                  {nameValid && <img className="validation-tick" src={tickOnIcon} alt="TickOn" />}
                </span>
              </div>

              <div className="input-area">
                <label htmlFor="email-field">Email : </label>
                <input
                  type="email"
                  id="email-field"
                  className="input-field"
                  title="Enter your Email address"
                  required
                  onChange={handleEmailChange}
                />
                <span>
                  {!emailValid && <img className="validation-tick" src={tickOffIcon} alt="TickOff" />}
                  {emailValid && <img className="validation-tick" src={tickOnIcon} alt="TickOn" />}
                </span>
              </div>
            </form>
          </div>

          {isFormValid ? (
            <button
              className='participate-proceed-btn-enabled'
              type="submit"
              onClick={handleProceed}
            >
              <span>Proceed</span>
              <img className='participate-proceed-icon' src={arrowRightIcon} alt="ProceedIcon" />
            </button>
          ) : (
            <button className='participate-proceed-btn-disabled' disabled={!isFormValid}>
              <span>Proceed</span>
            </button>
          )}
        </div>

        <Footer />
      </>)
  );
};

Participate1.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Participate1;