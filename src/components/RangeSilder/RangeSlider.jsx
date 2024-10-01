import React, { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import HostField from "../HostField";
import {
  usePrice,
  usePriority,
  useReload,
  useSearchStore,
} from "../../../store/credentialStore";
import { GiSettingsKnobs } from "react-icons/gi";
import useOutsideClose from "../../hooks/useOutsideClose";

function RangeSlider({ className }) {
  const MIN = 0;
  const MAX = 10000;

  const priceRange = usePrice((state) => state.priceRange);
  const setPriceRange = usePrice((state) => state.setPriceRange);
  const setSearch = useSearchStore((state) => state.setSearch);
  const [showFilter, setShowFilter] = useState(false);
  const showFilterReference = useRef(null);
  const setReload = useReload((state) => state.setReload);
  const setPriority = usePriority((state) => state.setPriority);

  useOutsideClose({
    setState: setShowFilter,
    reference: showFilterReference,
    arg: false,
  });

  return (
    <>
      <div
        ref={showFilterReference}
        className={`${className} fixed airbnb-setup-shadow z-10 top-[28%] left-[2%] ${
          !showFilter
            ? "p-2 cursor-pointer active:scale-90 transition-all ease-in-out "
            : "px-8 py-5 fixed"
        }  text-rose-500 rounded-xl bg-white border}`}
        onClick={() => setShowFilter(true)}
      >
        {!showFilter ? (
          <div className="flex items-center gap-2 p-1">
            <GiSettingsKnobs
              size={24}
              className="text-black outline-none cursor-pointer"
              style={{ transform: "rotate(90deg)" }}
            />
            <h1 className="text-xl scale-75">Filter</h1>
          </div>
        ) : (
          <div>
            <h1 className="pb-3 text-3xl leading-10">Select Price</h1>
            <div className="flex [&>*:nth-child(n)]:-mx-px gap-5 box-border justify-around">
              <HostField
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
                field_name="min"
                className={`rounded max-w-24`}
                min={MIN}
                max={MAX}
              />
              <HostField
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                field_name="max"
                className={`rounded max-w-24`}
              />
            </div>
            <ReactSlider
              className="range-slider"
              onChange={setPriceRange}
              min={MIN}
              max={MAX}
              value={priceRange}
            />
            <div className="flex justify-between [&>button]:bg-slate-200/80 [&>button]:px-2 [&>button]:py-1 [&>button]:rounded">
              <select
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
                className="outline outline-1 outline-slate-200/80 px-1 py-0.5 rounded"
              >
                <option value="">defalut</option>
                <option value="price">low to high</option>
                <option value="-price">high to low</option>
              </select>
            </div>
            <button
              onClick={() => {
                setSearch();
                setReload();
              }}
              className="px-4 py-2 mt-2 text-white transition-all bg-blue-500 rounded-lg active:scale-95"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default RangeSlider;
