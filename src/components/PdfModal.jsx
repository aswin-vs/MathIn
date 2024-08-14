// PdfModal.jsx

import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/PdfModal.css';
import modelPdf from '../assets/MathIn.pdf';
import closeIcon from '../assets/xMark.svg';

const PdfModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="pdf-modal-close-btn" onClick={onClose}>
          <img src={closeIcon} alt="CloseIcon" />
        </button>
        <embed src={modelPdf} type="application/pdf" height="450" width="1150" />
      </div>
      <Footer />
    </div>
  );
};

PdfModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PdfModal;
