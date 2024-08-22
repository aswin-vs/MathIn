// App.jsx
// This project is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { useState } from 'react';
import Topics from './components/Topics';
import Practice from './components/Practice';
import PdfModal from './components/PdfModal';
import Footer from './components/Footer';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Topics');
  const [clickedButton, setClickedButton] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonClick = (title, subtitle, screen) => {
    setClickedButton([title, subtitle]);
    setCurrentScreen(screen);
  };

  const handleBackButtonClick = () => {
    setClickedButton([]);
    setCurrentScreen('Topics');
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible ? (
        <PdfModal isVisible={isModalVisible} onClose={handleModalClose} />
      ) : (
        <>
          {currentScreen === 'Topics' && (
            <>
              <Topics onButtonClick={handleButtonClick} onModalOpen={handleModalOpen} />
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