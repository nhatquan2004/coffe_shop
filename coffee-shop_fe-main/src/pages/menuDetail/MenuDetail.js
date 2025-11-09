import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import "./MenuDetail.css";

function MenuDetail() {
  const { id } = useParams();
  const { menus } = useContext(ProductContext);
  const navigate = useNavigate();
  
  const [detail, setDetail] = useState(null);
  const [size, setSize] = useState("S");
  const [topping, setTopping] = useState("espresso");

  const sizeOptions = [
    { size: "S" },
    { size: "M" },
    { size: "L" },
  ];

  const toppingOptions = [
    { topping: "espresso", name: "shot espresso" },
    { topping: "caramel", name: "sốt caramel" },
  ];

  // ✅ BUILD FULL IMAGE URL
  const getImageUrl = (imgPath) => {
    if (!imgPath || typeof imgPath !== 'string' || !imgPath.trim()) {
      return null;
    }

    const trimmedPath = imgPath.trim();
    
    // If it's already a full URL, return as-is
    if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
      return trimmedPath;
    }

    // If it starts with /, prepend API base URL
    if (trimmedPath.startsWith('/')) {
      return `http://localhost:5000${trimmedPath}`;
    }

    // Otherwise prepend both base URL and slash
    return `http://localhost:5000/images/${trimmedPath}`;
  };

  // Load menu from context
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (menus && menus.length > 0) {
      const item = menus.find(m => m._id === id);
      if (item) {
        setDetail(item);
        console.log("✅ Menu detail loaded:", item);
        console.log("✅ Image URL:", getImageUrl(item.img));
      } else {
        console.warn("❌ Menu item not found:", id);
      }
    }
  }, [menus, id]);

  // Render loading
  if (!menus || menus.length === 0) {
    return (
      <section className="menu-detail">
        <Container>
          <Row>
            <Col lg="12">
              <p style={{ textAlign: "center", padding: "2rem", color: "white" }}>
                Loading menu details...
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // Render not found
  if (!detail) {
    return (
      <section className="menu-detail">
        <Container>
          <Row>
            <Col lg="12">
              <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>
                Menu item not found!
              </p>
              <div style={{ textAlign: "center" }}>
                <button 
                  onClick={() => navigate("/menu")}
                  style={{ padding: "10px 20px", cursor: "pointer" }}
                >
                  Back to Menu
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  const imageUrl = getImageUrl(detail.img);

  // Render content
  return (
    <section className="menu-detail">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12">
            <div className="detail-left">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={detail.title}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error("❌ Image failed to load:", imageUrl);
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div style={{ 
                  width: "100%", 
                  height: "400px", 
                  background: "#ddd", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "#666"
                }}>
                  No image available
                </div>
              )}
            </div>
          </Col>

          <Col lg="6" md="6" sm="12">
            <div className="detail-content">
              <h1>{detail.title || "Menu Item"}</h1>
              <h2>${detail.price || "0.00"}</h2>
              <p className="desc">{detail.description}</p>

              {/* Size Selection */}
              <div className="size-topping">
                <p><strong>Size:</strong></p>
                <ul className="options">
                  {sizeOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => setSize(option.size)}
                      className={size === option.size ? "active" : ""}
                      style={{ cursor: "pointer", padding: "8px 12px", marginRight: "10px" }}
                    >
                      {option.size}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topping Selection */}
              <div className="size-topping">
                <p><strong>Topping:</strong></p>
                <ul className="options">
                  {toppingOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => setTopping(option.topping)}
                      className={topping === option.topping ? "active" : ""}
                      style={{ cursor: "pointer", padding: "8px 12px", marginRight: "10px" }}
                    >
                      {option.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Button */}
              <button 
                className="order-btn"
                style={{ 
                  padding: "12px 30px", 
                  marginTop: "20px",
                  background: "#df2020",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Order Now
              </button>
              
              <button 
                onClick={() => navigate("/menu")}
                style={{ 
                  padding: "12px 30px", 
                  marginTop: "10px",
                  marginLeft: "10px",
                  background: "#f1f1f1",
                  color: "#000",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                ← Back to Menu
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default MenuDetail;