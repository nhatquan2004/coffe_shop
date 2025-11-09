import { Container, Row, Col } from "reactstrap";
import { FaCopyright } from "react-icons/fa";
import "./FooterText.css";
function FooterText() {
  return (
    <div className="footer-text">
      <Container>
        <Row>
          <Col lg="12">
            <p>
              <FaCopyright style={{marginRight:"3px"}}/> Copyright 2023
              <p className="highlight"> MoodOn Coffee </p> All Right Reserved.{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FooterText;
