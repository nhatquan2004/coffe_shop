import { useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import { gallery } from "../../assets/data/Data";
import Subtitle from "../../shared/subTitle/SubTitle";

import "./Gallery.css";
function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="gallery-section" id="gallery">
      <Container>
        <Row>
          <Col lg="12">
            <div className="sub">
              <Subtitle subtitle={"Gallery"} />
              <h2>Our Photo Gallery</h2>
            </div>
          </Col>
          <div className="gallery-container">
            {gallery.map((gallery) => (
              <div className="gallery-card" key={gallery.id}>
                <img src={gallery.img} alt="" className="gallery-img"></img>
                <Link to="/" className="gallery-icon">
                  <FaPlus />
                </Link>
                <h3 className="gallery-title">{gallery.title}</h3>
              </div>
            ))}
          </div>
        </Row>
      </Container>
    </section>
  );
}

export default Gallery;
