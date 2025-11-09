import { Container, Row, Col } from "reactstrap";
import { FaCheck } from "react-icons/fa6";

import aboutImg from "../../assets/images/about-img.jpg";
import SubTitle from "../../shared/subTitle/SubTitle";

import "./About.css";
function About() {
  return (
    <section className="section-about" id="about">
      <Container>
        <Row>
          <Col lg="6">
            <div className="about-img">
              <img src={aboutImg} alt=""></img>
            </div>
          </Col>
          <Col lg="6">
            <div className="about-content">
              <SubTitle subtitle={"About US"} />
              <h2>fresh quality and organic tasty coffee house for you</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
              <div className="rating-box">
                <div className="rating">
                  <FaCheck style={{color:"#ba9373"}}/>
                  <span>quis nostrud exercitation ullamco</span>
                </div>
                <div className="rating">
                  <FaCheck style={{color:"#ba9373"}}/>
                  <span>quis nostrud exercitation ullamco</span>
                </div>
                <div className="rating">
                  <FaCheck style={{color:"#ba9373"}}/>
                  <span>quis nostrud exercitation ullamco</span>
                </div>
              </div>
              <button className="btn btn_active">Our Experts</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
