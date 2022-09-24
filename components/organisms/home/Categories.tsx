import React, { useState } from "react";
import { Category } from "../../molecules/home/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link, animateScroll as scroll } from 'react-scroll';

export const Categories = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex p-12 flex-col items-center" id="categories">
      <div
        className={`xl:w-3/4 2xl:w-11/12 grid grid-cols-1 grid-rows-3 overflow-hidden justify-center sm:grid-cols-2 md:grid-rows-2 gap-4 lg:grid-cols-3 lg:grid-rows-1 auto-rows-none ${
          showMore && "auto-rows-auto" 
        }`}
      >
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>

      <span className="text-primary text-xl cursor-pointer" onClick={() => setShowMore(!showMore)}>
        {showMore ? (
                <span className="text-primary text-xl cursor-pointer" onClick={() => scroll.scrollTo(window.innerHeight, {
                    duration: 500
                })}>
            Ver Menos <FontAwesomeIcon icon={faChevronUp} />
          </span>

        ) : (
          <span className="text-primary text-xl cursor-pointer">
            Ver Mas <FontAwesomeIcon icon={faChevronDown} />
          </span>
        )}
      </span>
    </div>
  );
};
