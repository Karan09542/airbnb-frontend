import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

function Pagination({ pages, setSkip, skip, reload }) {
  const currentPage = Math.floor(skip / 18) + 1;

  const prevFourPageNo = Array.from(
    { length: Math.min(4, currentPage - 1) },
    (_, index) => currentPage - 1 - index
  )
    .filter((value) => value > 0)
    .reverse();

  const nextTwoPageNo = Array.from(
    { length: Math.min(2, pages - currentPage) },
    (_, index) => currentPage + 1 + index
  ).filter((value) => value > 0);
  const paginationArr = [...prevFourPageNo, currentPage, ...nextTwoPageNo];
  useEffect(() => {
    if (skip) {
      setSkip(1);
      console.log("skip", Math.floor(skip / 18) + 1);
    }
  }, [reload]);
  // console.log("prevFourPageNo", prevFourPageNo);
  // console.log("nextTwoPageNo", nextTwoPageNo);

  const [highLightTo, setHighLightTo] = useState(currentPage);

  useEffect(() => {
    // Update highLightTo whenever skip changes
    window.scrollTo(0, 0);
    setHighLightTo(currentPage);
  }, [skip, currentPage]);
  return (
    <div className="flex items-center justify-center w-full gap-3 py-10 [&>*:nth-child(n)]:active:scale-95">
      <IoIosArrowBack
        onClick={() => {
          if (highLightTo > 1) {
            setHighLightTo((prev) => prev - 1);
            setSkip((prev) => (highLightTo === 1 ? prev : prev - 18));
          }
        }}
        className={`${
          highLightTo === 1
            ? "text-stone-300 cursor-not-allowed "
            : "cursor-pointer text-stone-800"
        } p-[0.43rem] rounded-full aspect-square hover:bg-stone-100 `}
        size={32}
      />

      {paginationArr.map((page, i) => {
        {
          return (
            <button
              key={page}
              onClick={() => {
                setSkip((page - 1) * 18);
                setHighLightTo(page);
              }}
              className={`${
                highLightTo === page
                  ? "text-white bg-black"
                  : "text-black hover:bg-stone-100"
              } rounded-full h-8 aspect-square`}
            >
              {page}
            </button>
          );
        }
      })}
      <IoIosArrowForward
        onClick={() => {
          if (highLightTo < pages) {
            setHighLightTo((prev) => prev + 1);
            setSkip((prev) => prev + 18);
          }
        }}
        className={`${
          highLightTo === pages
            ? "text-stone-300 cursor-not-allowed "
            : "cursor-pointer text-stone-800 "
        } p-[0.43rem] rounded-full aspect-square hover:bg-stone-100  `}
        size={32}
      />
    </div>
  );
}

export default Pagination;
