import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import paypal from "../../assets/images/paypal.png";
import amex from "../../assets/images/amex.png";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { BASE_URL } from "../../utils/config"; // ✅ [SỬA] THÊM IMPORT BASE_URL
import { toast } from "react-toastify";
import "./PayMent.css";

function PayMent() {
  // 📝 State lưu phương thức thanh toán được chọn
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📝 Phương thức thanh toán
  const paymentMethods = [
    {
      id: "visa",
      name: "Visa",
      icon: visa,
      description: "Thẻ Visa",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      icon: mastercard,
      description: "Thẻ Mastercard",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: paypal,
      description: "Ví PayPal",
    },
    {
      id: "amex",
      name: "American Express",
      icon: amex,
      description: "Thẻ American Express",
    },
  ];

  // ✅ [SỬA] Handle chọn phương thức thanh toán
  const handleSelectPayment = (methodId) => {
    setSelectedPayment(methodId);
  };

  // ✅ [SỬA] Handle thanh toán - gọi API backend
  const handleCheckout = async () => {
    if (!selectedPayment) {
      toast.error("❌ Vui lòng chọn phương thức thanh toán!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("💳 Đang xử lý thanh toán...");

    try {
      // ✅ [SỬA] Sử dụng BASE_URL thay vì hardcode localhost
      // BASE_URL = "http://localhost:5000/api/v1" (dev)
      // BASE_URL = "https://coffee-shop-backend-pg5o.onrender.com/api/v1" (prod)
      
      const res = await fetch(`${BASE_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // ✅ Thêm token nếu cần
        },
        body: JSON.stringify({
          paymentMethod: selectedPayment,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.update(toastId, {
          render: result.message || "❌ Thanh toán thất bại!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setLoading(false);
        return;
      }

      // ✅ Thanh toán thành công
      toast.update(toastId, {
        render: result.message || "✅ Thanh toán thành công!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // 📝 Reset
      setSelectedPayment(null);
      setLoading(false);
    } catch (error) {
      console.error("❌ Lỗi thanh toán:", error);
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
    <section className="payment__section">
      <div className="payment__container">
        <h2 className="payment__title">💳 Chọn phương thức thanh toán</h2>
        <p className="payment__subtitle">
          Lựa chọn phương thức thanh toán phù hợp với bạn
        </p>

        {/* Payment Methods Grid */}
        <div className="payment__grid">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment__card ${
                selectedPayment === method.id ? "active" : ""
              }`}
              onClick={() => handleSelectPayment(method.id)}
            >
              {selectedPayment === method.id && (
                <div className="payment__check">
                  <FaCheckCircle size={24} color="#27ae60" />
                </div>
              )}

              <img
                src={method.icon}
                alt={method.name}
                className="payment__icon"
              />

              <h3 className="payment__method-name">{method.name}</h3>
              <p className="payment__method-desc">{method.description}</p>
            </div>
          ))}
        </div>

        {/* Checkout Button */}
        <div className="payment__actions">
          <button
            className="payment__btn btn btn-primary"
            onClick={handleCheckout}
            disabled={!selectedPayment || loading}
          >
            {loading ? "⏳ Đang xử lý..." : "💰 Tiến hành thanh toán"}
          </button>

          {selectedPayment && (
            <p className="payment__selected">
              ✅ Đã chọn: <strong>{paymentMethods.find(m => m.id === selectedPayment)?.name}</strong>
            </p>
          )}
        </div>

        {/* Info Text */}
        <div className="payment__info">
          <p>🔒 <strong>Thanh toán an toàn 100%</strong></p>
          <p>✅ Hỗ trợ tất cả phương thức thanh toán chính</p>
          <p>📞 Liên hệ hỗ trợ: 1900-xxxx nếu có vấn đề</p>
        </div>
      </div>
    </section>
  );
}

export default PayMent;