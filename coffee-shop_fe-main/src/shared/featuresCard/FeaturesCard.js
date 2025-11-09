import shape from "../../assets/images/shape.png";

import "./FeaturesCard.css";
function FeaturesCard({ feature }) {
  return (
    <div className="card">
      <img src={feature.img} alt="" className="card-logo"></img>
      <h3 className="card-tilte">{feature.title}</h3>
      <p className="card-description">{feature.description}</p>
      <img src={shape} className="shape-img" alt=""></img>
    </div>
  );
}

export default FeaturesCard;
  