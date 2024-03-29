// This webapp is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { useState } from 'react';
import Welcome from './components/Welcome';
import Play from './components/Play';
import Footer from './components/Footer';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [clickedButton, setClickedButton] = useState([]);

  const handleButtonClick = (title, subtitle, screen) => {
    setClickedButton([title, subtitle]);
    setCurrentScreen(screen);
  };

  const handleBackButtonClick = () => {
    setClickedButton([]);
    setCurrentScreen('welcome');
  };

  return (
    <>
      {currentScreen === 'welcome' && <Welcome onButtonClick={handleButtonClick} />}
      {currentScreen !== 'welcome' && (
        <>
          <Play fulltitle={clickedButton} screen={currentScreen} onBackButtonClick={handleBackButtonClick} />
        </>
      )}
      <Footer />
    </>
  );
};

export default App;