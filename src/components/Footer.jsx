// Footer.jsx

import '../styles/footer.css';
import heartIcon from '../assets/heart.svg';

const Footer = () => {
  return (
    <footer className="footer">
      Made with&nbsp;
      <img src={heartIcon} alt="HeartIcon" />
      &nbsp;by&nbsp;
      <a href="https://github.com/aswin-vs" target="_blank" rel="noreferrer">
        <span>Aswin V S</span>
      </a>
    </footer>
  )
}

export default Footer;