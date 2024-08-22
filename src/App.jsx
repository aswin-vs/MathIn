// App.jsx
// This project is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { useState } from 'react';
import Topics from './components/Topics';
import Practice from './components/Practice';
import Content from './components/Content';
import Footer from './components/Footer';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Topics');
  const [clickedButton, setClickedButton] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleButtonClick = (title, subtitle, screen) => {
    setClickedButton([title, subtitle]);
    setCurrentScreen(screen);
  };

  const handleBackButtonClick = () => {
    setClickedButton([]);
    setCurrentScreen('Topics');
  };

  const handleContentOpen = () => {
    setIsContentVisible(true);
  };

  const handleContentClose = () => {
    setIsContentVisible(false);
  };

  return (
    <>
      {isContentVisible ? (
        <Content isVisible={isContentVisible} onClose={handleContentClose} />
      ) : (
        <>
          {currentScreen === 'Topics' && (
            <>
              <Topics onButtonClick={handleButtonClick} onContentOpen={handleContentOpen} />
              <Footer />
            </>
          )}

          {currentScreen !== 'Topics' && (
            <>
              <Practice
                fulltitle={clickedButton}
                screen={currentScreen}
                onBackButtonClick={handleBackButtonClick}
              />
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;