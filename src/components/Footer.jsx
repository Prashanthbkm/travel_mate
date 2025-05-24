import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p className="footer-text">Made with ❤️ by Prashanth</p>
      <div className="footer-icons">
        <a
          href="https://www.linkedin.com/in/b-k-m-prashanth-914773211?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2FyYvDbBFSuCP7wMLTI0ZOA%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/rock_prashanth_09/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          aria-label="Instagram"
        >
          <RiInstagramFill />
        </a>
        <a
          href="mailto:prashanthbkm72@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
          aria-label="Email"
        >
          <MdEmail />
        </a>
      </div>
      <p className="footer-copyright">© {new Date().getFullYear()} TravelMate</p>
    </div>
  </footer>
);

export default Footer;