import { NavLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { SiLinkedin, SiGithub } from "react-icons/si";
import './Footer.css'; // Ruta al archivo CSS personalizado

const Footer = () => {

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-secondary pt-4">
      <div className="container">
        <div className="row">

          <div className="col-lg-4 d-flex flex-column align-items-center">
            <h5 className="text-center" style={{ color: 'white' }}>About us</h5>
            <ul className="list-unstyled text-center" style={{ fontSize: '14px' }}>
              <li><NavLink onClick={handleClick} className="custom-link" to="/terms">Terms and conditions</NavLink></li>
              <li><NavLink onClick={handleClick} className="custom-link" to="/about">The Bark Side</NavLink></li>
              <li><NavLink onClick={handleClick} className="custom-link" to="/about">About me</NavLink></li>
            </ul>
          </div>

          <div className="col-lg-4 d-flex flex-column align-items-center">
            <h5 className="text-center" style={{ color: 'white' }}>Contact us</h5>
            <ul className="list-unstyled text-center" style={{ fontSize: '14px' }}>
              <li style={{ fontWeight: '900', fontSize: '12px' }}>martinezelias166@gmail.com</li>
              <li style={{ fontWeight: '900', fontSize: '12px' }}>+54-11-4888-4304</li>
              <li><NavLink onClick={handleClick} className="custom-link" to="/contact">Message</NavLink></li>
              <li><NavLink onClick={handleClick} className="custom-link" to="/faq">FAQ</NavLink></li>
            </ul>
          </div>

          <div className="col-lg-4 d-flex flex-column align-items-center">
            <h5 className="text-center" style={{ color: 'white' }}>Social media</h5>
            <ul className="list-unstyled text-center" style={{ fontSize: '14px' }}>
              <li><a className="custom-link" href="https://www.instagram.com/xliazzzx" target="_blank" rel="noreferrer">Instagram <FaInstagram id="iconoInstagram" /></a></li>
              <li><a className="custom-link" href="https://www.linkedin.com/in/elias-martinez-040980246/" target="_blank" rel="noreferrer" >Linkedin <SiLinkedin id="iconoLinkedIn" /></a></li>
              <li><a className="custom-link" href="https://www.github.com/XliazZz" target="_blank" rel="noreferrer">GitHub  <SiGithub id="iconoGitHub" /></a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
