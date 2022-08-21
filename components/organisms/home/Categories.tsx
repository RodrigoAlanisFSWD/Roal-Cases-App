import React, { useState } from "react";
import { Category } from "../../molecules/home/Category";
import styles from "../../../styles/organisms/home/Categories.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link, animateScroll as scroll } from 'react-scroll';

export const Categories = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles["categories"]} id="categories">
      <div
        className={`${styles["categories__articles"]} ${
          showMore ? styles["categories__articles--more"] : ""
        }`}
      >
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>

      <span onClick={() => setShowMore(!showMore)}>
        {showMore ? (
                <span onClick={() => scroll.scrollTo(window.innerHeight, {
                    duration: 500
                })}>
            Ver Menos <FontAwesomeIcon icon={faChevronUp} />
          </span>

        ) : (
          <span>
            Ver Mas <FontAwesomeIcon icon={faChevronDown} />
          </span>
        )}
      </span>
    </div>
  );
};
