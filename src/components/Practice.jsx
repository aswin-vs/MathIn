import { useState, useEffect, useRef } from 'react';
import '../styles/Practice.css';

import arrowLeftIcon from '../assets/arrow-left.svg';
import toggleOnIcon from '../assets/toggle-on.svg';
import toggleOffIcon from '../assets/toggle-off.svg';
import arrowRightIcon from '../assets/arrow-right.svg';
import correctIcon from '../assets/circle-check.svg';
import wrongIcon from '../assets/circle-x.svg';
import resetIcon from '../assets/reset.svg';

import MathInDB from '../assets/MathInDB.json';

const Practice = ({ fulltitle, screen, onBackButtonClick }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [reverseBtn, setReverseBtn] = useState(false);
  const [reverseTriggered, setReverseTriggered] = useState(false);
  const [userInput, setUserInput] = useState('');
  const inputRef = useRef(null);
  const [enterKeyCount, setEnterkeycount] = useState(0);
  const [showCorrectIcon, setShowCorrectIcon] = useState(false);
  const [showWrongIcon, setShowWrongIcon] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState();
  const [resetTriggered, setResetTriggered] = useState(false);

  useEffect(() => {
    if (reverseTriggered || resetTriggered) {
      fetchRandomQuestion(screen);
      setUserInput('');
      inputRef.current.focus();
      setEnterkeycount(0);
      setShowCorrectIcon(false);
      setShowWrongIcon(false);
      setAnswerSubmitted(false);
      setResetTriggered(false);
      setReverseTriggered(false);
    }
    else {
      fetchRandomQuestion(screen);
      inputRef.current.focus();
    }
  }, [reverseTriggered, resetTriggered, screen]);

  const fetchRandomQuestion = (screen) => {
    if (reverseBtn) {
      const values = Object.values(MathInDB[screen]);
      const randomIndex = Math.floor(Math.random() * values.length);
      setCurrentQuestion(values[randomIndex]);
    }

    else {
      const keys = Object.keys(MathInDB[screen]);
      const randomIndex = Math.floor(Math.random() * keys.length);
      setCurrentQuestion(keys[randomIndex]);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (reverseBtn) {
      const correctAns = [];
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
      } else {
        setShowCorrectIcon(false);
        setShowWrongIcon(true);
      }
    }

    else {
      setCorrectAnswers(MathInDB[screen][currentQuestion]);
      if (userInput === MathInDB[screen][currentQuestion]) {
        setShowCorrectIcon(true);
        setShowWrongIcon(false);
      } else {
        setShowCorrectIcon(false);
        setShowWrongIcon(true);
      }
    }
    setAnswerSubmitted(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && enterKeyCount === 0) {
      setEnterkeycount(1);
      handleSubmit();
    }
    else if (e.key === 'Enter' && enterKeyCount === 1) {
      setEnterkeycount(0);
      handleReset();
    }
  };

  const handleReset = () => {
    setResetTriggered(true);
  };

  return (
    <div className="practice-container">
      <div className='practice-header'>
        <button onClick={onBackButtonClick} className='practice-back-button'><img src={arrowLeftIcon} alt="Back" /></button>
        <h1 className='practice-main-title'>{fulltitle[0]}&nbsp;<span>{fulltitle[1]}</span></h1>
        {reverseBtn ?
          (<button className='practice-toggleOnIcon' onClick={() => { setReverseBtn(false); setResetTriggered(true); }}><img src={toggleOnIcon} alt="Toggle-on" /></button>) :
          (<button className='practice-toggleOffIcon' onClick={() => { setReverseBtn(true); setResetTriggered(true); }}><img src={toggleOffIcon} alt="Toggle-off" /></button>)
        }
      </div>

      <div className="practice-flexbox1">
        <h2 className="practice-question">{currentQuestion}&nbsp;=&nbsp;?</h2>
        <div className='practice-flexbox2'>
          <input ref={inputRef} className="practice-input" type="text" value={userInput} onChange={handleInputChange} onKeyDown={handleKeyPress} />
          <button className="practice-input-btn" onClick={handleSubmit}><img className="practice-input-icon" src={arrowRightIcon} alt="Submit" /></button>
          {showCorrectIcon && <img className='practice-correct-icon' src={correctIcon} alt="Correct" />}
          {showWrongIcon && <img className='practice-wrong-icon' src={wrongIcon} alt="Wrong" />}
        </div>

        <div className='practice-flexbox3'>
          <div className='practice-flexbox4' style={{ visibility: answerSubmitted ? 'visible' : 'hidden' }}>
            <div className='practice-answers1'>Correct Answer</div>
            <div className='practice-answers2'>{correctAnswers}</div>
          </div>
          <button className='practice-reset-btn' onClick={handleReset}><img src={resetIcon} alt="Reset" /></button>
        </div>
      </div>
    </div >
  );
};

export default Practice;