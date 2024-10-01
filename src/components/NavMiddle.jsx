import React, { useEffect, useState } from "react";
import Search from "./Search";
import { useBigSearchStore } from "../../store/credentialStore";

function NavMiddle() {
  // const [name, setName] = useState("");
  // function handleChange(e) {
  //   console.log(e);
  //   setName(e.target.value);
  // }

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 970;

  useEffect(() => {
    // console.log("सीताराम साईबाबा");
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const [experience, setExperience] = useState(0);
  function handleExperience(index) {
    setExperience(index);
  }

  const isBig = useBigSearchStore((state) => state.isBig);

  return (
    <>
      <div
        className={`flex flex-col items-center relative transition-all duration-300 ${
          width < 950 ? isBig && "top-[60px] mb-3" : isBig && "top-[20px]"
        }
        }] ${isBig && "left-[90px] grow"}`}
      >
        {isBig && (
          <div className="flex gap-3 text-[1.12em]">
            <span
              onClick={() => handleExperience(0)}
              className={`p-3 rounded-[2em] ${
                experience === 0
                  ? "font-[700]"
                  : "hover:bg-[var(--general-hover)]"
              } cursor-pointer`}
            >
              Stays
            </span>
            <span
              onClick={() => handleExperience(1)}
              className={`p-3 rounded-[2em] ${
                experience === 1
                  ? "font-[700]"
                  : "hover:bg-[var(--general-hover)]"
              } cursor-pointer`}
            >
              Experiences
            </span>
          </div>
        )}

        <Search
          className={`${"absolute top-[60px]"} ${
            width <= breakpoint
              ? width < 580
                ? "w-[540px]"
                : "w-[90vw]"
              : "w-[864px]"
          } h-[70px]`}
        />
      </div>
    </>
  );
}

export default NavMiddle;
