// Footer.jsx

import footerIcon from '../assets/heart.svg';

const Footer = () => {
  return (
    <footer className="footer">Made with&nbsp;<img src={footerIcon} alt="footer-icon" />&nbsp;by&nbsp;<a href="https://github.com/aswin-vs" target="_blank" rel="noreferrer"><span style={{ 'fontWeight': '600', 'pointerEvents': 'auto' }}>Aswin V S</span></a></footer>
  )
}

export default Footer