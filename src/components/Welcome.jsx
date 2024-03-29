import '../styles/Welcome.css';

const Welcome = ({ onButtonClick }) => {
  const playOptions = [
    { id: 0, title: 'Tables', subtitle: '(20x20)', screen: 'Tables20x20' },
    { id: 1, title: 'Squares', subtitle: '(30)', screen: 'Squares30' },
    { id: 2, title: 'Cubes', subtitle: '(12)', screen: 'Cubes12' },
    { id: 3, title: 'Powers of 2', subtitle: '(12)', screen: 'Powersof2' },
    { id: 4, title: 'Powers of 3', subtitle: '(6)', screen: 'Powersof3' },
    { id: 5, title: 'Reciprocals', subtitle: '(12)', screen: 'Reciprocals12' },
  ];

  return (
    <div className="welcome-container">
      <h1 className='welcome-main-title'>Math<span>In</span></h1>
      <h2 className="welcome-sub-title">Choose your play</h2>
      <div className="welcome-play-options">
        {playOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onButtonClick(option.title, option.subtitle, option.screen)}
            className="welcome-button"
          >
            {option.title}&nbsp;{option.subtitle}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Welcome;