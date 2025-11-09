import { Container, Col, Row } from "reactstrap";

import SubTitle from "../../shared/subTitle/SubTitle";
import choseImg from "../../assets/images/choose.jpg";
import coffeeMug from "../../assets/images/coffee-mug.svg";
import coffeeBeans2 from "../../assets/images/coffee-beans-2.svg";
import coffeeBeans3 from "../../assets/images/coffee-beans-3.svg";

import "./Choose.css";
function Why() {
  return (
    <section className="choose-section">
      <Container>
        <Row>
          <Col lg="6">
            <SubTitle subtitle={"Why Choose Us"} />
            <h2>MoodOn Coffe Most Out Of Your Favorite & Tasty Coffee House</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
            </p>
            <div className="choose-box">
              <img src={coffeeMug} alt=""></img>
              <div className="choose-content">
                <h3>Awesome Aroma</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </div>
            </div>
            <div className="choose-box">
              <img src={coffeeBeans2} alt=""></img>
              <div className="choose-content">
                <h3>Pure Grades</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </div>
            </div>
            <div className="choose-box">
              <img src={coffeeBeans3} alt=""></img>
              <div className="choose-content">
                <h3>Healthy Coffee</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </p>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <img src={choseImg} alt=""></img>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Why;
