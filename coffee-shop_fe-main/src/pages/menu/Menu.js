import React, { useContext, useEffect } from "react";
import { Container, Col, Row } from "reactstrap";
import { ProductContext } from "../../contexts/ProductContext";
import SubTitle from "../../shared/subTitle/SubTitle";
import MenuCard from "../../shared/menuCard/MenuCard";
import "./Menu.css";

function Menu() {
  const { menus, loading } = useContext(ProductContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="menu-section" id="menu">
      <Container>
        <Row>
          <Col lg="12">
            <div className="sub">
              <SubTitle subtitle={"Our Menu"} />
              <h2>Let's Check Our Menu</h2>
            </div>
          </Col>

          {loading ? (
            <Col lg="12" className="text-center">
              <p style={{ color: "white" }}>Loading menus...</p>
            </Col>
          ) : menus && menus.length > 0 ? (
            menus.map((menu) => (
              <Col lg="6" md="6" sm="12" xs="12" key={menu._id} className="mb-4">
                <MenuCard menu={menu} />
              </Col>
            ))
          ) : (
            <Col lg="12" className="text-center">
              <p style={{ color: "white" }}>No menu items available</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Menu;
