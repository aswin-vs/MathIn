// Content.jsx

import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/content.css';

import content1 from '../assets/mathIn1.svg';
import content2 from '../assets/mathIn2.svg';
import content3 from '../assets/mathIn3.svg';
import downloadIcon from '../assets/download.svg';
import closeIcon from '../assets/xMark.svg';
import contentPdf from '../assets/mathIn.pdf';

const Content = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="content-box1" onClick={onClose}>
      <div className="content-box2" onClick={(e) => e.stopPropagation()}>
        <div className='content-box3'>
          <a href={contentPdf} download >
            <button className="content-download-btn">
              <img src={downloadIcon} alt="downloadIcon" />
            </button>
          </a>

          <button className="content-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="closeIcon" />
          </button>
        </div>

        <div className='content-box4'>
          <img src={content1} alt="content1" />
          <img src={content2} alt="content2" />
          <img src={content3} alt="content3" />
        </div>
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