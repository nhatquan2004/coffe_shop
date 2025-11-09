import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import Subtitle from "../../shared/subTitle/SubTitle";
import { offer } from "../../assets/data/Data";

import "./Offer.css";

function SampleArrow(sample) {
  const { sytle } = sample;
  return <div sytle={{ ...sytle, display: "none" }}></div>;
}
function Offer() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slideToShow: 1,
    slideToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    customPaging: (i) => (
      <div
        style={{
          width: "15px",
          height: "15px",
          color: "blue",
          border: "2px solid #fff",
          borderRadius: "50%",
        }}
        className="dot"
      ></div>
    ),
    appendDots: (dots) => <ul style={{ margin: "-1rem 0" }}> {dots} </ul>,
  };
  return (
    <section className="offer-section">
      <Container>
        <Row>
          <Col lg="12">
            <div className="sub">
              <Subtitle subtitle={"Offer"} />
              <h2>Special Offer For You</h2>
            </div>
          </Col>
          <Slider {...settings}>
            {offer.map((offer) => (
              <div className="slide" key={offer.id}>
                <div className="slide-img">
                  <img src={offer.img} alt=""></img>
                </div>
                <div className="slide-offer">
                  <div className="slide-content">
                    <h3>{offer.title}</h3>
                    <p className="offer-discount">{offer.discount}</p>
                    <p className="offer-description">{offer.description}</p>
                    <button className="btn btn_active">Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Row>
      </Container>
    </section>
  );
}

export default Offer;
