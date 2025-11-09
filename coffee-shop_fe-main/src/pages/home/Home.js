import { Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import About from "../about/About";
import Features from "../features/Features";
import Offer from "../../components/offer/Offer";
import Chefs from "../chefs/Chefs";
import Testimonials from "../testimonials/Testimonials";
import Choose from "../../components/choose/Choose";
import Stat from "../../components/stat/Stat";
import "./Home.css";
function Home() {
  return (
    <>
      <section className="home-section" id="home">
        <Container>
          <Row>
            <Col lg="6">
              <div className="introduce">
                <div className="home-content">
                  <h2>welcome to coffee!</h2>
                  <h1>
                    discover amazing coffee <br></br> house & get energy
                  </h1>
                  <p>
                    There are many variations of passengers available but the
                    majority have suffered alteration in some form by injected
                    humor or randomised words
                  </p>
                </div>
                <div className="buttons">
                  <Link to="/menu">
                    <button className="btn btn_active">Check Menu</button>
                  </Link>

                  <Link to="/reservation">
                    <button className="btn ">Book Table</button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <About />
      <Choose />
      <Stat />
      <Features />
      <Offer />
      <Chefs />
      <Testimonials />
    </>
  );
}

export default Home;
