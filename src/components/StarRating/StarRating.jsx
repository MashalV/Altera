import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";


function StarRating({rating}) {
        const roundedRating = Math.round(rating * 2) / 2;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= roundedRating) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#ddb8ac" }} />);
          } else if (i - rating < 1) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: "#ddb8ac" }} />);
          } else {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "#dcdcdc" }} />);
          }
        }
        return <div className="star-rating">{stars}</div>;
      };

export default StarRating