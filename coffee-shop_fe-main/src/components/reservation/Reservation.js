import { Container, Col, Row, Form, Input, FormText, Toast } from "reactstrap";
import { CiBookmark } from "react-icons/ci";
import classNames from "classnames/bind";

import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";
import SubTitle from "../../shared/subTitle/SubTitle";
import shape02 from "../../assets/images/shape-2.png";
import shape03 from "../../assets/images/shape-3.png";

import styles from "./Reservation.module.css";
import { useState } from "react";
const cx = classNames.bind(styles);
function Reservation() {
  const [information, setInformation] = useState({
    name: "",
    email: "",
    phone: 0,
    date: "",
    time: "",
    people: 0,
    message: "",
  });
  const handleChange = (e) => {
    setInformation((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Loading...", { autoClose: 5000 });
    try {
      const res = await fetch(`${BASE_URL}/reservation`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(information),
      });
      const result = await res.json();
      if (!res.ok) {
        return toast.update(id, {
          render: result.message,
          isLoading: false,
          pauseOnHover: false,
          autoClose: 3000,
          type: "error",
        });
      }
      if (result.data) {
        return toast.update(id, {
          render: result.message,
          isLoading: false,
          pauseOnHover: false,
          autoClose: 3000,
          type: "success",
        });
      }
    } catch (error) {
      return toast.update(id, {
        render: error.message,
        isLoading: false,
        pauseOnHover: false,
        autoClose: 3000,
        type: "error",
      });
    }
  };

  return (
    <section className={cx("reservation-section")}>
      <Container>
        <Row>
          <Col lg="12">
            <div className={cx("form")}>
              <img src={shape02} alt="" className={cx("shape-2")}></img>
              <img src={shape03} alt="" className={cx("shape-3")}></img>
              <div className={cx("sub")}>
                <SubTitle subtitle={"Reservation"} />
                <h2>Book A Table</h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <div className={cx("input-box")}>
                  <Input
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Name"
                    id="name"
                  ></Input>
                  <Input
                    onChange={handleChange}
                    type="email"
                    placeholder="Email Address"
                    id="email"
                  ></Input>
                  <Input
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="Your Phone"
                    id="phone"
                  ></Input>
                </div>
                <div className={cx("input-box")}>
                  <Input
                    onChange={handleChange}
                    type="date"
                    placeholder="Date"
                    id="date"
                  ></Input>
                  <Input
                    onChange={handleChange}
                    type="time"
                    placeholder="Time"
                    min="08:00"
                    max="21:00"
                    step="600"
                    id="time"
                  ></Input>
                  <Input
                    onChange={handleChange}
                    type="number"
                    min="0"
                    placeholder="Number Of People"
                    id="people"
                  ></Input>
                </div>
                <div className={cx("input-box")}>
                  <textarea
                    placeholder="Your Message"
                    type="text"
                    id="message"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className={cx("book-btn")}>
                  <button type="submit" className={cx("btn btn_active")}>
                    <CiBookmark />
                    Book A Table
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Reservation;
