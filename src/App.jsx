// This webapp is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { useState } from 'react';
import Topics from './components/Topics';
import Practice from './components/Practice';
import Footer from './components/Footer';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Topics');
  const [clickedButton, setClickedButton] = useState([]);

  const handleButtonClick = (title, subtitle, screen) => {
    setClickedButton([title, subtitle]);
    setCurrentScreen(screen);
  };

  const handleBackButtonClick = () => {
    setClickedButton([]);
    setCurrentScreen('Topics');
  };

  return (
    <>
      {currentScreen === 'Topics' && <Topics onButtonClick={handleButtonClick} />}
      {currentScreen !== 'Topics' && (
        <>
          <Practice fulltitle={clickedButton} screen={currentScreen} onBackButtonClick={handleBackButtonClick} />
        </>
      )}
      <Footer />
    </>
  );
};

export default App;