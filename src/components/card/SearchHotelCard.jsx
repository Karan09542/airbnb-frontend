import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useParams } from "react-router-dom";
import {
  usePrice,
  usePriority,
  useReload,
  useSearchStore,
} from "../../../store/credentialStore";
import FavoriteButton from "../favorites/FavoriteButton";
import Pagination from "../Pagination";

function SearchHotelCard({ className }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(true);
  const [slideStates, setSlideStates] = useState({});
  const [skip, setSkip] = useState(0);

  const handleBeforeChange = (hotelId, oldIndex, newIndex) => {
    setSlideStates((prevState) => ({
      ...prevState,
      [hotelId]: {
        ...prevState[hotelId],
        currentSlide: newIndex,
      },
    }));
  };

  const SamplePrevArrow = ({ onClick, hotelId }) => {
    const currentSlide = slideStates[hotelId]?.currentSlide || 0;
    return (
      <div
        className={`bg-white absolute left-5 top-[50%] -translate-y-1/2 z-10 border rounded-full opacity-0 group-hover:opacity-100 ${
          currentSlide === 0 ? "hidden" : "block"
        } hover:scale-105 transition-all`}
      >
        <FaAngleLeft
          className="p-2"
          style={{
            height: "28px",
            width: "28px",
            color: "black",
          }}
          onClick={onClick}
        />
      </div>
    );
  };

  const SampleNextArrow = ({ onClick, hotelId }) => {
    const currentSlide = slideStates[hotelId]?.currentSlide || 0;
    const totalSlides = slideStates[hotelId]?.totalSlides || 1;
    return (
      <div
        className={`bg-white absolute right-5 top-[50%] -translate-y-1/2 border rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 ${
          currentSlide === totalSlides - 1 ? "hidden" : "block"
        } hover:scale-105`}
      >
        <FaAngleRight
          className="p-2"
          style={{
            height: "28px",
            width: "28px",
            color: "black",
          }}
          onClick={onClick}
        />
      </div>
    );
  };
  const search = useSearchStore((state) => state.search);
  const params = useParams();
  const priceRange = usePrice((state) => state.priceRange);
  const [pages, setPages] = useState(0);
  const reload = useReload((state) => state.reload);
  const priority = usePriority((state) => state.priority);

  useEffect(() => {
    // price[lte]=5000
    setMoreLoading(true);
    fetch(
      `/hotel?limit=18&skip=${skip}&searchText=${params.searchText}&price[lte]=${priceRange[1]}&price[gte]=${priceRange[0]}&sort=${priority}`
    )
      .then((res) => res.json())
      .then((data) => {
        const initialSlideStates = data.hotels.reduce((acc, hotel) => {
          acc[hotel._id] = {
            currentSlide: 0,
            totalSlides: hotel.image_url.length,
          };
          return acc;
        }, {});
        setSlideStates(initialSlideStates);
        setHotels(data.hotels);
        setPages(data.pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        setLoading(false);
      })
      .finally(() => {
        setMoreLoading(false);
      });
  }, [search, skip, reload]);

  useEffect(() => {
    document.title = `Search: ${params.searchText} | ${
      "Page-" + (Math.floor(skip / 18) + 1)
    }`;
  }, [params.searchText, skip]);

  const override = {
    display: "block",
    margin: "auto",
  };
  if (loading) {
    return <ClipLoader cssOverride={override} size={51} />;
  }

  return (
    <>
      {moreLoading && <ClipLoader cssOverride={override} size={51} />}
      {hotels.length === 0 ? (
        <h1 className="text-3xl text-center h-[30vh] py-20">No hotels found</h1>
      ) : (
        <div className="grid grid-cols-1 gap-6 py-10 mr-5 sm:grid-cols-2 ml-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 ">
          {hotels.map((hotel) => {
            const settings = {
              dots: true,
              appendDots: (dots) => (
                <div
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    padding: "30px",
                  }}
                >
                  <ul
                    style={{ margin: "0px" }}
                    className="[&:nth-child(1)]:flex [&:nth-child(1)]:justify-center [&>*>button:nth-child(1)]:before:bg-white [&>*>button:nth-child(1)]:before:rounded-full [&>*>button:nth-child(1)]:scale-[0.3]"
                  >
                    {" "}
                    {dots}{" "}
                  </ul>
                </div>
              ),

              infinite: false,
              speed: 200,
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 0,
              beforeChange: (oldIndex, newIndex) =>
                handleBeforeChange(hotel._id, oldIndex, newIndex),
              prevArrow: <SamplePrevArrow hotelId={hotel._id} />,
              nextArrow: <SampleNextArrow hotelId={hotel._id} />,
            };

            return (
              <div key={hotel._id} className={`group relative`}>
                <Link to={`/rooms/${hotel._id}`} target="_blank">
                  <Slider {...settings}>
                    {hotel.image_url.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt={img}
                        className="h-[270px] rounded-2xl"
                      />
                    ))}
                  </Slider>
                  <div className="mt-3">
                    <p className="font-semibold text-stone-950">
                      {hotel.city + " " + hotel.state}
                    </p>
                    <p className="text-stone-600">Hosted by {hotel.name}</p>
                    <p className="text-xl font-semibold">
                      &#8377;{hotel.price.toLocaleString("en-IN")}{" "}
                      <small className="font-normal">hapta</small>
                    </p>
                  </div>
                </Link>
                <FavoriteButton hotelId={hotel._id} />
              </div>
            );
          })}
        </div>
      )}
      <Pagination pages={pages} setSkip={setSkip} skip={skip} reload={reload} />
    </>
  );
}

export default SearchHotelCard;
