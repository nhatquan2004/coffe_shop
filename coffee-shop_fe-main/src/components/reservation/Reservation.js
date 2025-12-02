import { Container, Col, Row, Form, Input, FormText } from "reactstrap";
import { CiBookmark } from "react-icons/ci";
import classNames from "classnames/bind";
import { BASE_URL } from "../../utils/config"; // ✅ [ĐÚNG] Import BASE_URL từ config.js
import { toast } from "react-toastify";
import SubTitle from "../../shared/subTitle/SubTitle";
import shape02 from "../../assets/images/shape-2.png";
import shape03 from "../../assets/images/shape-3.png";
import styles from "./Reservation.module.css";
import { useState } from "react";

const cx = classNames.bind(styles);

function Reservation() {
  // 📝 State lưu thông tin đặt bàn
  const [information, setInformation] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    message: "",
  });

  // 📝 State loading
  const [loading, setLoading] = useState(false);

  // ✅ [SỬA] Xử lý change input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInformation((prev) => ({ 
      ...prev, 
      [id]: value 
    }));
  };

  // ✅ [SỬA] Xử lý submit form đặt bàn
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 📝 Kiểm tra input trước khi gửi
    if (!information.name || !information.email || !information.phone || !information.date || !information.time || !information.people) {
      toast.error("❌ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("📤 Đang gửi đặt bàn...");

    try {
      // ✅ [SỬA] Sử dụng BASE_URL thay vì hardcode localhost
      // BASE_URL = "http://localhost:5000/api/v1" (dev)
      // BASE_URL = "https://coffee-shop-backend-pg5o.onrender.com/api/v1" (prod)
      const res = await fetch(`${BASE_URL}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.update(toastId, {
          render: result.message || "❌ Lỗi đặt bàn!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      // ✅ Đặt bàn thành công
      toast.update(toastId, {
        render: result.message || "✅ Đặt bàn thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // 📝 Reset form
      setInformation({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        people: "",
        message: "",
      });

      setLoading(false);
    } catch (error) {
      console.error("❌ Lỗi gửi đặt bàn:", error);
      toast.update(toastId, {
        render: error.message || "❌ Lỗi kết nối!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="12">
            <SubTitle subtitle="Tính năng" title="Book A Table" />

            <div className={cx("reservation__form")}>
              <Form onSubmit={handleSubmit}>
                {/* Name */}
                <div className={cx("form__group")}>
                  <Input
                    placeholder="Tên của bạn"
                    type="text"
                    id="name"
                    value={information.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Email */}
                <div className={cx("form__group")}>
                  <Input
                    placeholder="Email"
                    type="email"
                    id="email"
                    value={information.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Phone */}
                <div className={cx("form__group")}>
                  <Input
                    placeholder="Số điện thoại"
                    type="tel"
                    id="phone"
                    value={information.phone}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Date */}
                <div className={cx("form__group")}>
                  <Input
                    type="date"
                    id="date"
                    value={information.date}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Time */}
                <div className={cx("form__group")}>
                  <Input
                    type="time"
                    id="time"
                    value={information.time}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* People */}
                <div className={cx("form__group")}>
                  <Input
                    placeholder="Số người"
                    type="number"
                    id="people"
                    value={information.people}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Message */}
                <div className={cx("form__group")}>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Ghi chú thêm"
                    value={information.message}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={cx("addToCart__btn")}
                  disabled={loading}
                >
                  {loading ? "⏳ Đang gửi..." : "📅 Đặt bàn ngay"}
                </button>
              </Form>
            </div>
          </Col>

          <Col lg="6" md="12">
            <div className={cx("reservation__img")}>
              <img src={shape02} alt="reservation" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Reservation;