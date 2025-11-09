import { Container, Col, Row } from "reactstrap";

import { chefs } from "../../assets/data/Data";
import SubTitle from "../../shared/subTitle/SubTitle";

import "./Chefs.css";
import ChefCard from "../../shared/chefcard/ChefCard";
function Chefs() {
  return (
    <section className="chefs-section" id="chefs">
      <Container>
        <Row>
          <Col lg="12">
            <div className="sub">
              <SubTitle subtitle={"Chefs"} />
              <h2>Meet Our Experts</h2>
            </div>
          </Col>
          <div className="chefs">
            {chefs.map((chef, index) => (
              <ChefCard chef={chef} key={index} />
            ))}
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default Chefs;
