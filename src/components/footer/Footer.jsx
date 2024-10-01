import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import Browse from "../../assets/browse.svg?react";
import Tweeter from "../../assets/tweeter.svg?react";
import { AiFillFacebook } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
  const footerInspirationTitle = [
    "Popular",
    "Arts & culture",
    "Outdoors",
    "Mountains",
    "Beach",
    "Unique stays",
    "Categories",
    "Things to do",
  ];
  const [highlightTo, setHighlightTo] = useState(null);
  const [whatInspiration, setWhatInspiration] = useState({});

  useEffect(() => {
    fetch(`/content/inspiration.json`)
      .then((res) => res.json())
      .then((inspir) => setWhatInspiration(inspir));
  }, []);
  const showInspiration = [...Object.keys(whatInspiration)].splice(0, 17);
  const showMoreInspiration = [...Object.keys(whatInspiration)];
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="bg-stone-100">
      <div className="mx-auto max-w-[1080px] pt-8 px-5 pb-10">
        <h1 className="text-2xl font-semibold text-stone-900">
          Inspiration for future getaways
        </h1>
        {/* topic */}
        <div className="flex gap-5 mt-5 border-b border-stone-300">
          {footerInspirationTitle.map((inspiration) => {
            return (
              <span
                key={inspiration}
                className={`text-stone-600 text-sm font-medium leading-10 cursor-pointer ${
                  highlightTo === inspiration
                    ? "text-stone-700 border-b-2 border-black"
                    : ""
                }`}
                onClick={() => setHighlightTo(inspiration)}
              >
                {inspiration}
              </span>
            );
          })}
        </div>
        {/* title content */}
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2   mt-6 gap-3 text-[0.93rem]">
          {isShown &&
            showMoreInspiration.map((inspira) => {
              return (
                <div
                  key={inspira}
                  className="[&>:nth-child(1)]:font-semibold [&>:nth-child(1)]:text-stone-900 leading-7 cursor-pointer"
                >
                  <p>{inspira}</p>
                  <p className="-mt-3 text-stone-600">
                    {whatInspiration[inspira]}
                  </p>
                </div>
              );
            })}
          {!isShown &&
            showInspiration.map((inspira) => {
              return (
                <div
                  key={inspira}
                  className="[&>:nth-child(1)]:font-semibold [&>:nth-child(1)]:text-stone-900 leading-7 cursor-pointer"
                >
                  <p>{inspira}</p>
                  <p className="-mt-3 text-stone-600">
                    {whatInspiration[inspira]}
                  </p>
                </div>
              );
            })}
          {isShown ? (
            <button
              onClick={() => setIsShown(!isShown)}
              className="font-bold text-left text-stone-700 flex items-center text-[0.93rem]"
            >
              Show less <IoIosArrowUp fill="black" />
            </button>
          ) : (
            <button
              onClick={() => setIsShown(!isShown)}
              className="font-bold text-left text-stone-700 flex items-center text-[0.93rem]"
            >
              Show more <IoIosArrowDown fill="black" />
            </button>
          )}
        </div>
      </div>
      <hr className="border-stone-300" />
      {/* copy right section */}
      <div className="flex justify-between items-center mx-auto max-w-[1080px] px-5 pt-8 pb-5 ">
        <div className="text-sm ">
          <span>&copy;2024 Airbnb, Inc.</span>{" "}
          <span>
            {" "}
            <Link to="#" className="hover:underline">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link to="#" className="hover:underline">
              Terms
            </Link>{" "}
            ·{" "}
            <Link to="#" className="hover:underline">
              Sitemap
            </Link>{" "}
            ·{" "}
            <Link to="#" className="hover:underline">
              Company details
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Browse />
          <span>English(IN)</span>
          <span>&#8377; INR</span>
          <AiFillFacebook size={24} />
          <Tweeter style={{ width: 20 }} />
          <FaSquareInstagram size={24} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
