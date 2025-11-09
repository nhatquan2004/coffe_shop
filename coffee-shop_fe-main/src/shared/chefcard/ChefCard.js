import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import "./ChefCard.css";
function ChefCard({ chef }) {
  const { img, name, level } = chef;
  return (
    <div className="chef-card">
      <div className="chef-img">
        <img src={img} alt=""></img>
        <div className="socials">
          <a href="/">
            <FaFacebookF />
          </a>
          <a href="/">
            <FaYoutube />
          </a>
          <a href="/">
            <FaLinkedinIn />
          </a>
          <a href="/">
            <FaTwitter />
          </a>
        </div>
      </div>
      <div className="info">
        <p className="chef-name">{name}</p>
        <p className="chef-level">{level}</p>
      </div>
    </div>
  );
}

export default ChefCard;
