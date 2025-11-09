import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import paypal from "../../assets/images/paypal.png";
import amex from "../../assets/images/amex.png";
import { FaCheckCircle } from "react-icons/fa";

import "./PayMent.css";
function PayMent() {
  return (
    <section className="payment">
      <div className="payment-box">
        <h4 className="payment-title">
          Select a <span style={{ color: "#23a767" }}>payment</span> method
        </h4>
        <form action="#">
          <input type="radio" id="visa" name="payment"></input>
          <input type="radio" id="mastercard" name="payment"></input>
          <input type="radio" id="paypal" name="payment"></input>
          <input type="radio" id="amex" name="payment"></input>
          <div className="category">
            <label for="visa" className="visa">
              <div className="imgName">
                <div className="img-container">
                  <img src={visa} alt="no-img" style={{ width: "60px" }}></img>
                </div>{" "}
              </div>
              <span className="check">
                <FaCheckCircle />
              </span>
            </label>
            <label for="mastercard" className="mastercard">
              <div className="imgName">
                <div className="img-container">
                  <img
                    src={mastercard}
                    alt="no-img"
                    style={{ width: "70px" }}
                  ></img>
                </div>  
              </div>
              <span className="check">
                <FaCheckCircle />
              </span>
            </label>
            <label for="paypal" className="paypal">
              <div className="imgName">
                <div className="img-container">
                  <img
                    src={paypal}
                    alt="no-img"
                    style={{ width: "40px" }}
                  ></img>
                </div>
              </div>
              <span className="check">
                <FaCheckCircle />
              </span>
            </label>
            <label for="amex" className="amex">
              <div className="imgName">
                <div className="img-container">
                  <img src={amex} alt="no-img" style={{ width: "45px" }}></img>
                </div>{" "}
              </div>
              <span className="check">
                <FaCheckCircle />
              </span>
            </label>
          </div>
        </form>
        <button>proceed to checkout</button>
      </div>
    </section>
  );
}

export default PayMent;
