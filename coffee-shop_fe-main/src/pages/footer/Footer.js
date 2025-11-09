import { Container, Row } from "reactstrap";
import { AiOutlinePhone } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import {
  FaCaretRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import FooterText from "../../components/footerText/FooterText";

import "./Footer.css";

function Footer() {
  return (
    <>
      <section className="footer-section" id="footer">
        <Container>
          <Row>
            <div className="footer-container">
              {/* Left Section */}
              <div className="left">
                {/* ✅ THAY ĐỔI - Chỉ còn text thay vì ảnh */}
                <div className="footer-logo">
                  ☕ MoodOn Caffe
                </div>

                <p className="footer-description">
                  We are many variations of passengers available but the
                  majority have suffered alteration in some form by injected
                  humor or randomised words which don't look even slightly
                  believable.
                </p>
                <ul className="footer-info">
                  <li>
                    <AiOutlinePhone />
                    <span>+0 123 456 789</span>
                  </li>
                  <li>
                    <FiMapPin />
                    <span>25/B Milford Road, New York</span>
                  </li>
                  <li>
                    <CiMail />
                    <span>example@gmail.com</span>
                  </li>
                </ul>
              </div>

              {/* Center Section */}
              <div className="center">
                <div className="quick-link">
                  <h3>Quick Links</h3>
                  <ul className="footer-links">
                    <li>
                      <FaCaretRight
                        style={{
                          color: "var(--primary-color)",
                          marginRight: "5px",
                        }}
                      />
                      <span>About Us</span>
                    </li>
                    <li>
                      <FaCaretRight
                        style={{
                          color: "var(--primary-color)",
                          marginRight: "5px",
                        }}
                      />
                      <span>Menu</span>
                    </li>
                    <li>
                      <FaCaretRight
                        style={{
                          color: "var(--primary-color)",
                          marginRight: "5px",
                        }}
                      />
                      <span>Features</span>
                    </li>
                    <li>
                      <FaCaretRight
                        style={{
                          color: "var(--primary-color)",
                          marginRight: "5px",
                        }}
                      />
                      <span>Gallery</span>
                    </li>
                    <li>
                      <FaCaretRight
                        style={{
                          color: "var(--primary-color)",
                          marginRight: "5px",
                        }}
                      />
                      <span>Team</span>
                    </li>
                    <li>
                      <FaCaretRight
                        style={{
                          color: "var(--primary-color)",
                          marginRight: "5px",
                        }}
                      />
                      <span>Reservation</span>
                    </li>
                  </ul>
                </div>

                <div className="opening-hours">
                  <h3>Opening Hours</h3>
                  <ul className="schedule">
                    <li>
                      <span className="day">Monday:</span>
                      <span className="time">9AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">Tuesday:</span>
                      <span className="time">9AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">Wednesday:</span>
                      <span className="time">9AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">Thursday:</span>
                      <span className="time">9AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">Friday:</span>
                      <span className="time">9AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">Saturday:</span>
                      <span className="time">9AM - 6PM</span>
                    </li>
                    <li>
                      <span className="day">Sunday:</span>
                      <span className="time">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="newsletter">
                <h3>NewsLetter</h3>
                <div className="newsletter-content">
                  <p>Subscribe our newsletter to get latest update and news</p>
                  <input placeholder="Your Email" type="email" />
                  <button className="btn btn_active">
                    <CiMail style={{ marginRight: "5px" }} />
                    Subscribe Now
                  </button>

                  {/* Follow Us Section */}
                  <div className="follow-section">
                    <p className="follow-title">Follow Us</p>
                    <ul className="social-links">
                      <li>
                        <a href="/">
                          <FaFacebookF style={{ color: "var(--title-color)" }} />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <FaTwitter style={{ color: "var(--title-color)" }} />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <FaLinkedinIn style={{ color: "var(--title-color)" }} />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <FaYoutube style={{ color: "var(--title-color)" }} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
      <FooterText />
    </>
  );
}

export default Footer;
