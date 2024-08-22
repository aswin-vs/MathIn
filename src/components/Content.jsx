// Content.jsx

import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/Content.css';

import M1 from '../assets/MathIn1.svg';
import M2 from '../assets/MathIn2.svg';
import M3 from '../assets/MathIn3.svg';
import closeIcon from '../assets/xMark.svg';
import ContentPdf from '../assets/MathIn.pdf';

const Content = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="content-box1" onClick={onClose}>
      <div className="content-box2" onClick={(e) => e.stopPropagation()}>
        <button className="content-close-btn" onClick={onClose}>
          <img src={closeIcon} alt="CloseIcon" />
        </button>

        <div className='content-box3'>
          <img src={M1} alt="M1" />
          <img src={M2} alt="M2" />
          <img src={M3} alt="M3" />
        </div>

        {/* <embed src={ContentPdf} type="application/pdf" height="450" width="1150" /> */}
        {/* <iframe
          src={ContentPdf}
          type="application/pdf"
          width="1150px"
          height="450px"
          style={{ border: 'none' }}
        /> */}

        {/* <iframe
          src={`https://drive.google.com/file/d/1xmoqKM_aR8rKm3mBI-M3j8OujBf9z1uP/preview`}
          width="1150px"
          height="450px"
          style={{ border: 'none', transform: 'scale(1)', transformOrigin: '0 0' }}
          allowFullScreen
        /> */}

      </div>
      <Footer />
    </div>
  );
};

Content.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Content;