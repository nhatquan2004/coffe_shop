import { Link } from "react-router-dom";
import "./MenuCard.css";

function MenuCard({ menu }) {
  const handleImageError = (e) => {
    console.error("❌ Image failed to load:", menu.title, e.target.src);
    e.target.style.display = "none";
  };

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

  const imageUrl = getImageUrl(menu?.img);
  const hasValidImage = !!imageUrl;

  return (
    <div className="menu-card">
      <Link to={`/menu/${menu._id}`}>
        <div className="menu-img-container">
          {hasValidImage ? (
            <img
              src={imageUrl}
              alt={menu.title || "Menu item"}
              onError={handleImageError}
              loading="lazy"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="menu-img-fallback">
              {menu.title || "Menu"}
            </div>
          )}
        </div>

        <div className="menu-data">
          <div className="menu-text">
            <h3 className="menu-title">{menu.title}</h3>
            <p className="menu-description">{menu.description}</p>
          </div>
          <div className="menu-price">${menu.price}</div>
        </div>
      </Link>
    </div>
  );
}

export default MenuCard;