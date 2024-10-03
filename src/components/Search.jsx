import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useBigSearchStore, useSearchStore } from "../../store/credentialStore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useOutsideClose from "../hooks/useOutsideClose";

function Search({ className }) {
  const [click, setClick] = useState(false);
  const [sizeOfSearch, setSizeOfSearch] = useState(false);
  const searchRef = useRef(null);
  const [activeElement, setActiveElement] = useState(null);
  const setSearchText = useSearchStore((state) => state.setSearchText);
  const searchText = useSearchStore((state) => state.searchText);
  const setSearch = useSearchStore((state) => state.setSearch);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();
  useEffect(() => {
    function handleClick(e) {
      if (!searchRef.current?.contains(e.target)) {
        setClick(false);
        setActiveElement(null);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.addEventListener("mousedown", handleClick);
    };
  }, []);

  function handleActive(index) {
    setActiveElement(index);
  }

  function handleSizeOfSearch(e) {
    e.stopPropagation();
    setSizeOfSearch(false);
  }

  useEffect(() => {
    const initialValue = params.searchText || "";
    setSearchText(initialValue);
  }, [searchParams, setSearchText]);

  const isBig = useBigSearchStore((state) => state.isBig);
  const setIsBig = useBigSearchStore((state) => state.setIsBig);
  const [helper, setHelper] = useState(false);
  const inputRef = useRef(null);

  useOutsideClose({
    setState: setIsBig,
    reference: searchRef,
    arg: "handleBigSearch",
  });
  useOutsideClose({
    setState: setHelper,
    reference: searchRef,
    arg: false,
  });

  function handleScroll() {
    if (window.scrollY > 0) setIsBig(false);
    else setIsBig(true);
  }

  function handleHelper() {
    if (window.scrollY > 0) setHelper(false);
    else setHelper(true);
  }

  useEffect(() => {
    if (helper) {
      setIsBig(true);
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [helper, isBig]);

  useEffect(() => {
    window.addEventListener("scroll", handleHelper);
    return () => window.removeEventListener("scroll", handleHelper);
  }, []);

  useEffect(() => {
    if (isBig && activeElement === 0 && inputRef.current) {
      inputRef.current.focus(); // Focus the input when conditions are met
    }
  }, [isBig, activeElement]);
  return (
    <>
      {/* small search */}
      {!isBig && (
        <div
          className={` relative border cursor-pointer justify-between rounded-full flex mx-auto [&>*:not(div.empty)]:px-5 max-[850px]:[&>*:not(div.empty)]:px-4 max-[816px]:[&>*:not(div.empty)]:px-3 [&>*:not(div:empty)]:py-3 text-[0.9em] [&>div>*:nth-child(1)]:font-semibold [&>div>*:nth-child(1)]:text-[#404040] bg-white ${`[&_div.empty>p]:w-px [&_div.empty>p]:bg-gray-200 [&_div.empty]:flex [&_div.empty]:items-center [&_div.empty>p]:h-[70%]`}`}
          onClick={() => setHelper(true)}
        >
          <div
            onClick={() => {
              setIsBig(true);
              handleActive(0);
              setClick(true);
            }}
          >
            <p>{params.searchText || "AnyWhere"}</p>
          </div>
          <div className="empty">
            <p></p>
          </div>
          <div
            onClick={() => {
              setIsBig(true);
              handleActive(1);
              setClick(true);
            }}
          >
            <p>Any week</p>
          </div>
          <div className="empty">
            <p></p>
          </div>
          <div
            onClick={() => {
              setIsBig(true);
              handleActive(3);
              setClick(true);
            }}
          >
            <p>Add guests</p>
          </div>
          <div
            className={` !p-2 scale-75 bg-rose-500 text-white rounded-full aspect-square flex items-center justify-center`}
            style={{ filter: "contrast(108%)" }}
          >
            <BiSearch className="px-[0.4rem]" size={32} color="white" />
          </div>
        </div>
      )}

      {isBig && (
        <div
          className={` [&_div.empty]:h-full [&_div.empty]:flex [&_div.empty]:items-center [&_div.empty]:w-px [&_div.empty>p]:h-[70%] [&_div.empty>p]:w-px [&_div.empty>p]:bg-gray-200
        ${click ? "bg-gray-200" : "dark-shadow"}
      border ${
        className ? className : ""
      } cursor-pointer justify-between rounded-full flex mx-auto [&>*:not(div.empty)]:px-5 [&>*:not(div:empty)]:py-3 border-r text-[0.9em] [&>div>*:nth-child(1)]:font-semibold [&>div>*:nth-child(1)]:text-[#404040]
      `}
          onClick={() => {
            setClick(true);
            setSizeOfSearch(true);
          }}
          ref={searchRef}
        >
          <div
            className={` ${activeElement != 0 && "group hover:bg-[#d4d7db]"}
          rounded-full px-3 grow
          ${
            click && activeElement === 0
              ? "bg-white dark-shadow"
              : activeElement === null
              ? "bg-white"
              : "bg-gray-200 [&>*:nth-child(n)]:hover:bg-[var(--bg-hover)] hover:bg-[#d4d7db]"
          }
          
          `}
            onClick={() => handleActive(0)}
          >
            <p>Where</p>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search destination"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className={`outline-none ${
                activeElement != 0 && "group-hover:bg-[var(--bg-hover)]"
              } ${
                click && activeElement === 0
                  ? "bg-white"
                  : activeElement === null
                  ? "bg-white"
                  : "bg-gray-200"
              }`}
            />
          </div>
          <div className="empty">
            <p></p>
          </div>
          <div
            className={`
          rounded-full grow
          ${
            activeElement === 1
              ? "bg-white dark-shadow"
              : "hover:bg-[var(--bg-hover)]"
          }
          `}
            onClick={() => handleActive(1)}
          >
            <p>Check in</p>
            <p>Add dates</p>
          </div>
          <div className="empty">
            <p></p>
          </div>
          <div
            className={`
          rounded-full grow $
          ${
            activeElement === 2
              ? "bg-white dark-shadow"
              : "hover:bg-[var(--bg-hover)]"
          }
          `}
            onClick={() => handleActive(2)}
          >
            <p>Check out</p>
            <p>Add dates</p>
          </div>
          <div className="empty">
            <p></p>
          </div>
          <div
            className={`
          flex justify-between items-center rounded-full grow
          ${
            activeElement === 3
              ? "bg-white dark-shadow"
              : "hover:bg-[var(--bg-hover)]"
          }
          `}
            style={{ paddingRight: "0.5em" }}
            onClick={() => handleActive(3)}
          >
            <div>
              <p>Who</p>
              <p className="font-normal">Add guests</p>
            </div>

            <div
              onClick={(e) => {
                handleSizeOfSearch(e);
                setSearch();
                setSearchParams({ searchText });
                if (searchText) {
                  navigate(`/s/${searchText}`);
                } else {
                  navigate("/");
                }
              }}
              className={`transition-width duration-200 flex items-center justify-center rounded-full last:font-semibold bg-rose-500 ease-in text-white text-[1.1em] px-2 h-[50px] ${
                !sizeOfSearch && "aspect-square"
              }  ${sizeOfSearch && "pr-4"}`}
              style={{ filter: "contrast(108%)" }}
            >
              <BiSearch className=" px-[0.4em] text-white" size={32} />
              {sizeOfSearch && <p>Search</p>}
            </div>
          </div>
        </div>
      )}

      <hr
        className={`absolute ${
          isBig ? "top-[150px] w-screen" : `top-16 w-[101vw]`
        }`}
      />
    </>
  );
}

export default Search;
