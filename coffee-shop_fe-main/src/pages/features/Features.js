import { Container, Col, Row } from "reactstrap";
import { features } from "../../assets/data/Data";

import SubTitle from "../../shared/subTitle/SubTitle";
import FeaturesCard from "../../shared/featuresCard/FeaturesCard";

import "./Features.css";
function Features() {
  return (
    <section className="features-section" id="features">
      <Container>
        <Row>
          <Col lg="12">
            <div className="sub">
              <SubTitle subtitle={"Features"} />
              <h2>Our Best Features</h2>
            </div>
          </Col>
          <div className="features-container">
            {features.map((feature) => (
              <FeaturesCard feature={feature} key={feature.id} />
            ))}
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default Features;
