// Topics.jsx

import PropTypes from 'prop-types';
import '../styles/topics.css';
import sparklesIcon from '../assets/sparkles.svg';

const Topics = ({ onButtonClick, onContentOpen }) => {
  const playOptions = [
    { id: 0, title: 'Tables', subtitle: '(20x20)', screen: 'Tables20x20' },
    { id: 1, title: 'Squares', subtitle: '(30)', screen: 'Squares30' },
    { id: 2, title: 'Cubes', subtitle: '(12)', screen: 'Cubes12' },
    { id: 3, title: 'Powers of 2', subtitle: '(12)', screen: 'Powersof2' },
    { id: 4, title: 'Powers of 3', subtitle: '(6)', screen: 'Powersof3' },
    { id: 5, title: 'Reciprocals', subtitle: '(12)', screen: 'Reciprocals12' },
  ];

  return (
    <div className="topics-container">
      <div className="topics-main-title">
        <button onClick={onContentOpen}>
          <img src={sparklesIcon} alt="Sparkles Icon" />
          <h1>Math<span>In</span></h1>
          <img src={sparklesIcon} alt="Sparkles Icon" />
        </button>
      </div>

      <h2 className="topics-sub-title">Pick your play</h2>
      <div className="topics-play-options">
        {playOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onButtonClick(option.title, option.subtitle, option.screen)}
            className="topics-button"
          >
            {option.title}&nbsp;{option.subtitle}
          </button>
        ))}
      </div>
    </div>
  );
};

Topics.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  onContentOpen: PropTypes.func.isRequired,
};

export default Topics;