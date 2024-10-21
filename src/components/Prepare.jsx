// Prepare.jsx

import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';

import '../styles/prepare.css';
import sparklesIcon from '../assets/sparkles.svg';
import downloadIcon from '../assets/download.svg';
import xMarkIcon from '../assets/xMark.svg';
import prepare1 from '../assets/mathIn1.svg';
import prepare2 from '../assets/mathIn2.svg';
import prepare3 from '../assets/mathIn3.svg';
import preparePdf from '../assets/mathIn.pdf';

const Prepare = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  const handleDownload = () => {
    setLoading(true);
    const link = document.createElement('a');
    link.href = preparePdf;
    link.download = 'mathIn.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="prepare-box1">
      {loading && <Loader />}

      <div className="prepare-box2">
        <div className="prepare-box3">
          <button className="prepare-download-btn" onClick={handleDownload}>
            <img className="prepare-download-icon" src={downloadIcon} alt="Download Icon" />
          </button>

          <div className="prepare-title">
            <img src={sparklesIcon} alt="Sparkles Icon" />
            <h1>Math<span>In</span></h1>
            <img src={sparklesIcon} alt="Sparkles Icon" />
          </div>

          <button className="prepare-close-btn" onClick={handleClose}>
            <img src={xMarkIcon} alt="Close Icon" />
          </button>
        </div>

        <div className="prepare-box4">
          <img src={prepare1} alt="Prepare Illustration 1" />
          <img src={prepare2} alt="Prepare Illustration 2" />
          <img src={prepare3} alt="Prepare Illustration 3" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Prepare;