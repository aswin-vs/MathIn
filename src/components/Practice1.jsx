// Practice1.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';

import '../styles/practice1.css';
import MathInDB from '../assets/mathIn.json';
import sparklesIcon from '../assets/sparkles.svg';
import toggleOnIcon from '../assets/toggleOn.svg';
import toggleOffIcon from '../assets/toggleOff.svg';
import arrowLeftIcon from '../assets/arrowLeft.svg';
import arrowRightIcon from '../assets/arrowRight.svg';
import placeholderIcon from '../assets/placeholder.svg';
import correctIcon from '../assets/circleTick.svg';
import wrongIcon from '../assets/circleX.svg';

const Practice1 = ({ fulltitle, screen, onBackButtonClick }) => {
  const inputRef = useRef(null);
  const timeOutId = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [reverseBtn, setReverseBtn] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showCorrectIcon, setShowCorrectIcon] = useState(false);
  const [showWrongIcon, setShowWrongIcon] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState();
  const [progress, setProgress] = useState(0);
  const [blink, setBlink] = useState(false);

  const fetchRandomQuestion = useCallback(() => {
    if (reverseBtn) {
      const values = Object.values(MathInDB[screen]);
      const randomIndex = Math.floor(Math.random() * values.length);
      setCurrentQuestion(values[randomIndex]);
    } else {
      const keys = Object.keys(MathInDB[screen]);
      const randomIndex = Math.floor(Math.random() * keys.length);
      setCurrentQuestion(keys[randomIndex]);
    }
    setUserInput('');
    setShowCorrectIcon(false);
    setShowWrongIcon(false);
    setAnswerSubmitted(false);
    setBlink(false);
  }, [reverseBtn, screen]);

  useEffect(() => {
    fetchRandomQuestion();
    inputRef.current.focus();
  }, [reverseBtn, fetchRandomQuestion]);

  useEffect(() => {
    if (!answerSubmitted) {
      setProgress(0);
      let start;

      const updateProgress = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const newProgress = Math.min((elapsed / 4500) * 100, 100);
        setProgress(newProgress);

        if (elapsed < 4500) {
          timeOutId.current = requestAnimationFrame(updateProgress);
        } else {
          handleSubmit();
        }
      };

      timeOutId.current = requestAnimationFrame(updateProgress);

      return () => {
        cancelAnimationFrame(timeOutId.current);
      };
    }
  }, [currentQuestion, answerSubmitted]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = useCallback(() => {
    cancelAnimationFrame(timeOutId.current);

    let correctAns;
    if (reverseBtn) {
      correctAns = [];
      const keys = Object.keys(MathInDB[screen]);
      for (const key of keys) {
        if (MathInDB[screen][key] === currentQuestion) {
          correctAns.push(key);
        }
      }
      setCorrectAnswers(correctAns.join(', '));

      const userInputArr = userInput.replace(/\s/g, "").toLowerCase().split(",");
      if (userInputArr.every(e => correctAns.includes(e))) {
        setShowCorrectIcon(true);
        setShowWrongIcon(false);
        triggerBlink();
      } else {
        setShowCorrectIcon(false);
        setShowWrongIcon(true);
        triggerBlink();
      }
    } else {
      correctAns = MathInDB[screen][currentQuestion];
      setCorrectAnswers(correctAns);
      if (userInput === correctAns) {
        setShowCorrectIcon(true);
        setShowWrongIcon(false);
        triggerBlink();
      } else {
        setShowCorrectIcon(false);
        setShowWrongIcon(true);
        triggerBlink();
      }
    }
    setAnswerSubmitted(true);
  }, [currentQuestion, reverseBtn, screen, userInput]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !answerSubmitted) {
      handleSubmit();
    } else if (e.key === 'Enter' && answerSubmitted) {
      handleReset();
    }
  };

  const handleButtonClick = () => {
    if (!answerSubmitted) {
      handleSubmit();
    } else {
      handleReset();
    }
    inputRef.current.focus();
  };

  const handleReset = () => {
    fetchRandomQuestion();
    setProgress(0);
  };

  const toggleReverse = () => {
    setReverseBtn((prev) => !prev);
    fetchRandomQuestion();
  };

  const triggerBlink = () => {
    setBlink(true);
    setTimeout(() => setBlink(false), 1200);
  };

  return (
    <>
      <div className="practice1-container">
        <div className='practice1-subcontainer1'>
          <button onClick={onBackButtonClick} className='practice1-back-button'>
            <img src={arrowLeftIcon} alt="BackIcon" />
          </button>

          <div className="practice1-main-title">
            <img src={sparklesIcon} alt="SparklesIcon" />
            <h1>Math<span>In</span></h1>
            <img src={sparklesIcon} alt="SparklesIcon" />
          </div>
        </div>

        <div className='practice1-subcontainer2'>
          <div className='practice1-progress-bar'>
            <div className='practice1-progress' style={{ width: `${progress}%` }}></div>
          </div>

          <div className='practice1-header'>
            <h1 className='practice1-title'>
              <span>{fulltitle[0]}</span>&nbsp;
              <span>{fulltitle[1]}</span>
            </h1>

            {reverseBtn ? (
              <button className='practice1-toggleOnIcon' onClick={toggleReverse}>
                <img src={toggleOnIcon} alt="ToggleOn" />
              </button>
            ) : (
              <button className='practice1-toggleOffIcon' onClick={toggleReverse}>
                <img src={toggleOffIcon} alt="ToggleOff" />
              </button>
            )}
          </div>

          <div className="practice1-flexbox1">
            <h2 className="practice1-question">{currentQuestion}&nbsp;=&nbsp;?</h2>
            <div className="practice1-flexbox2">
              <input ref={inputRef} id="practice1-input" className="practice1-input" type="text" value={userInput} onChange={handleInputChange} onKeyDown={handleKeyPress} />
              <button className="practice1-input-btn" onClick={handleButtonClick}>
                <img className="practice1-input-icon" src={arrowRightIcon} alt="InputIcon" />
              </button>

              {(showCorrectIcon || showWrongIcon) ? (
                showCorrectIcon ? (
                  <img className={`practice1-correct-icon ${blink ? 'blink-animation' : ''}`} src={correctIcon} alt="CorrectIcon" />
                ) : (
                  <img className={`practice1-wrong-icon ${blink ? 'blink-animation' : ''}`} src={wrongIcon} alt="WrongIcon" />
                )
              ) : (
                <img style={{ visibility: 'hidden' }} className='practice1-correct-icon' src={placeholderIcon} alt="PlaceholderIcon" />
              )}
            </div>
          </div>

          <div className='practice1-flexbox3' style={{ display: answerSubmitted ? 'flex' : 'none' }}>
            <div className='practice1-answers1'><span>Correct Answer</span> :</div>
            <div className='practice1-answers2'>{correctAnswers}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

Practice1.propTypes = {
  fulltitle: PropTypes.array.isRequired,
  screen: PropTypes.string.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
};

export default Practice1;