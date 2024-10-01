import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Options({ className }) {
  const calculateSlidesToShow = () => {
    const width = window.innerWidth;
    const maxSlides = Math.floor(width / 101); // Calculate how many 101px slides can fit
    return Math.max(1, maxSlides); // Ensure at least one slide is shown
  };

  const [slidesToShow, setSlidesToShow] = useState(calculateSlidesToShow);
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(calculateSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`bg-white absolute left-0 top-0 z-10 border rounded-full ${
          currentSlide === 0 ? "hidden" : "block"
        } hover:scale-105 duration-200 transition-all`}
      >
        <FaAngleLeft
          className="p-2"
          style={{
            ...style,
            display: currentSlide === 0 ? "none" : "block",
            right: "100px",
            zIndex: "15",
            height: "32px",
            width: "32px",
            opacity: "1",
            color: "black",
          }}
          onClick={onClick}
        />
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`bg-white absolute right-0 top-0 border rounded-full ${
          currentSlide === 43 ? "hidden" : "block"
        } hover:scale-105 duration-200 transition-all`}
      >
        <FaAngleRight
          className="p-2"
          style={{
            ...style,
            display: currentSlide === 43 ? "hidden" : "block",
            right: "100px",
            zIndex: "15",
            height: "32px",
            width: "32px",
            opacity: "1",
            color: "black",
          }}
          onClick={onClick}
        />
      </div>
    );
  };
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  const [icons, setIcons] = useState({});
  useEffect(() => {
    fetch("/icon.json")
      .then((res) => res.json())
      .then((data) => setIcons(data));
  }, []);
  const [highlightTo, setHighlightTo] = useState(null);
  return (
    <div className={`slider-container ${className}`}>
      <Slider {...settings}>
        {Object.keys(icons).map((iconName) => {
          return (
            <div
              key={iconName}
              className={`group text-center !w-[101px] pb-6 ${
                highlightTo === iconName ? "opacity-100" : "opacity-60"
              } hover:opacity-100`}
              onClick={() => setHighlightTo(iconName)}
            >
              <img
                src={icons[iconName]}
                alt={iconName}
                width={24}
                className="block mx-auto"
              />
              <span
                className={`text-xs font-semibold relative pb-[1.4em] ${
                  highlightTo === iconName
                    ? "after:h-[2px] after:w-full after:absolute after:right-0 after:bottom-0 after:bg-black after:opacity-100"
                    : "group-hover:after:!opacity-20"
                } 
              after:transition-opacity after:duration-[1ms] group-hover:after:h-[2px] group-hover:after:w-full group-hover:after:absolute group-hover:after:right-0 group-hover:after:bottom-0 group-hover:after:bg-black`}
              >
                {iconName}
              </span>
            </div>
          );
        })}
      </Slider>
    </div>
    // <div
    //   className={`${
    //     window.location.pathname === `/s/${params.searchText}` &&
    //     "grid grid-cols-[90%_10%] items-center justify-center"
    //   }`}
    // >
    //   {window.location.pathname === `/s/${params.searchText}` && (
    //     <RangeSlider className={" -mt-7 w-fit"} />
    //   )}
    // </div>
  );
}

export default Options;
