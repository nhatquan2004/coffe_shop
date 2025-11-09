import { Container, Col, Row } from "reactstrap";

import coffeeShop from "../../assets/images/coffee-shop.svg";
import coffeeCup from "../../assets/images/coffee-cup.svg";
import chef from "../../assets/images/chef.svg";
import experience from "../../assets/images/experience.png";

import "./Stat.css";
function Stat() {
  return (
    <div className="stat-section">
      <Container>
        <Row>
          <div className="stat-container">
            <div className="stat-box">
              <div className="stat-img">
                <img src={coffeeShop} alt=""></img>
              </div>
              <h1 className="stat-number">1500</h1>
              <p className="stat-description">+ Total Branches</p>
            </div>
  
            <div className="stat-box">
              <div className="stat-img">
                <img src={coffeeCup} alt=""></img>
              </div>
              <h1 className="stat-number">250</h1>
              <p className="stat-description">+ Happy Customers</p>
            </div>
  
            <div className="stat-box">
              <div className="stat-img">
                <img src={chef} alt=""></img>
              </div>
              <h1 className="stat-number">120</h1>
              <p className="stat-description">+ Profesional Chefs</p>
            </div>
  
            <div className="stat-box">
              <div className="stat-img">
                <img src={experience} alt="" style={{ color: "#fff" }}></img>
              </div>
              <h1 className="stat-number">50</h1>
              <p className="stat-description">+ Years Of Experience</p>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Stat;
