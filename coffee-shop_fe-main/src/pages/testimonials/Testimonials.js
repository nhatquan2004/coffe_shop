import { Container, Col, Row } from "reactstrap";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

import SubTitle from "../../shared/subTitle/SubTitle";
import { testimonials } from "../../assets/data/Data";

import "./Testimonials.css";
function SampleArrow(sample) {
  const { sytle } = sample;
  return <div sytle={{ ...sytle, display: "none" }}></div>;
}

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <section className="testimonials-section" id="testimonials">
      <Container>
        <Row>
          <Col lg="12">
            <div className="sub">
              <SubTitle subtitle={"Testimonials"} />
              <h2>What Client Say's</h2>
            </div>
          </Col>

          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-description">
                  <p>{testimonial.description}</p>
                </div>
                <div className="testimonial-content">
                  <img
                    className="testimonial-img"
                    src={testimonial.img}
                    alt=""
                  ></img>
                  <div className="testimonial-info">
                    <h3>{testimonial.title}</h3>
                    <p>{testimonial.service}</p>
                    <div className="star-box">
                      <FaStar style={{ color: "var(--primary-color)" }} />
                      <FaStar style={{ color: "var(--primary-color)" }} />
                      <FaStar style={{ color: "var(--primary-color)" }} />
                      <FaStar style={{ color: "var(--primary-color)" }} />
                      <FaStar style={{ color: "var(--primary-color)" }} />
                    </div>
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

export default Testimonials;
