import React, { useEffect, useState } from "react";
import {
  useBaseURL,
  useLoginStore,
  useNavMiddleStore,
  useOpenModalStore,
} from "../../../store/credentialStore";
import AuthenticateModel from "../modals/AuthenticateModel";
import Navbar from "../Navbar";
import { FaAngleRight } from "react-icons/fa";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function Trips() {
  const [trips, setTrips] = useState([]);
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);
  const isLogin = useLoginStore((state) => state.isLogin);
  const [showDetail, setShowDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);

  const baseURL = useBaseURL((state) => state.baseURL);

  useEffect(() => {
    fetch(`${baseURL}/book/trips`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.status) {
          case "success": {
            setLoading(false);
            setTrips(data?.trips);
            const showDetailsKey = data?.trips.reduce((acc, trips) => {
              acc[trips._id] = false;
              return acc;
            }, {});
            setShowDetails(showDetailsKey);
            break;
          }
          case "fail": {
            toast.error(data.message);
            setOpenModel("login");
            setLoading(false);
            break;
          }
          case 409:
            toast.error(data.message);
            setLoading(false);
        }
      })
      .catch((err) => console.log(err.message));
  }, [isLogin, isCancelled]);

  const setIsNavMiddle = useNavMiddleStore((state) => state.setIsNavMiddle);
  useEffect(() => {
    setIsNavMiddle(false);
  }, []);

  function handleCancelBooking(bookingId) {
    fetch(`${baseURL}/book/cancelBooking`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsCancelled(!isCancelled);
          toast.success(data.message);
        } else if (data.status === "fail") {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err.message));
  }

  function deleteCancledBooking(bookingId) {
    fetch(`${baseURL}/book/deleteCancledBooking`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsCancelled(!isCancelled);
          toast.success(data?.message);
        } else if (data?.status === "fail") {
          toast.error(data?.message);
        }
      })
      .catch((err) => console.log(err.message));
  }

  const override = {
    display: "block",
    margin: "auto",
  };

  if (trips.length === 0) {
    return (
      <>
        <AuthenticateModel />
        <div className="">
          <Navbar />
        </div>
        <hr />
        <div className="max-w-[1080px] mx-auto pt-12 px-12">
          <div className="text-3xl text-center max-[949px]:mt-10">
            Trips not found?
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthenticateModel />
      <div className="max-w-[1080px] mx-auto">
        <Navbar />
      </div>
      <hr />
      {loading ? (
        <ClipLoader cssOverride={override} size={51} />
      ) : (
        <div className="max-w-[1080px] mx-auto pt-12 px-12">
          <h1 className="text-3xl font-semibold max-[949px]:mt-10">Trips</h1>
          <br />
          <hr />
          <div className="grid grid-cols-1 mt-12 md:gap- md:grid-cols-2 md-gap-0 md:justify-items-around lg:grid-cols-3 gap-x-3 gap-y-8">
            {/* main trips container above div */}
            {/* trip deatail */}
            {trips?.map((trip) => {
              return (
                <div
                  key={trip?._id}
                  className="relative mx-auto rounded-3xl w-96 sm:w-96 md:w-[85%] lg:w-72 reserve-shadow"
                >
                  <div
                    className={`w-full aspect-[2/1] bg-cover bg-center rounded-t-3xl`}
                    style={{
                      backgroundImage: `url(${trip?.hotel?.image_url[0]})`,
                    }}
                  >
                    {trip?.reservationStatus === "cancelled" && (
                      <button
                        className="absolute p-1 bg-white rounded-full inset-2 w-fit h-fit active:scale-95 "
                        onClick={() => deleteCancledBooking(trip._id)}
                      >
                        <MdDelete className="text-red-500" size={24} />
                      </button>
                    )}
                  </div>
                  <div className="px-5 pt-3">
                    {/* flex column if need */}
                    <p className="text-xs text-stone-500">
                      {new Date(trip?.checkInDate).toDateString()} -{" "}
                      {new Date(trip?.checkOutDate).toDateString()}
                    </p>
                    <h2 className="text-xl font-medium text-ellipsis overflow-clip text-nowrap">
                      {trip?.hotel?.location}
                    </h2>
                    <div className="flex items-center gap-3 py-2 text-stone-600">
                      {/* flex */}
                      <div>
                        <img
                          src={trip?.hotel?.image_url[0]}
                          alt=""
                          width={32}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex items-center justify-between w-10 gap-1 grow">
                        <p className="w-full overflow-hidden text-nowrap text-ellipsis">
                          {trip?.hotel?.description}{" "}
                        </p>
                        <Link
                          to={`/rooms/${trip?.hotel?._id}`}
                          target="_blank"
                          title="Extend veiw"
                        >
                          <FaAngleRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={`py-[0.4rem] ${
                      !showDetail[trip?._id] && "text-center"
                    }`}
                  >
                    {!showDetail[trip?._id] ? (
                      <div className="flex justify-around">
                        <button
                          className="px-1 py-1 transition-all rounded active:scale-95 active:bg-white active:text-rose-500"
                          onClick={() =>
                            setShowDetails((prev) => ({
                              ...prev,
                              [trip?._id]: true,
                            }))
                          }
                        >
                          Show more details
                        </button>
                        {/* bg-[#EAEAEC] text-white */}
                        {["pending", "cancelled"].includes(
                          trip?.reservationStatus
                        ) && (
                          <button
                            type="button"
                            onClick={() => {
                              handleCancelBooking(trip?._id);
                            }}
                            className={`${
                              trip?.reservationStatus === "cancelled"
                                ? "bg-rose-500/30 cursor-not-allowed"
                                : "bg-rose-500 active:scale-95 active:bg-rose-600"
                            } px-2 py-1 text-white transition-all rounded-lg`}
                          >
                            cancel
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="px-3 w-full scale-90 py-1 [&>div:nth-child(n)]:flex [&>div:nth-child(n)]:justify-between [&>div:nth-child(n)]:items-center [&>*:nth-child(n)]:mb-2 absolute left-1/2 bg-rose-500 text-white reserve-shadow rounded-xl z-10 ">
                        <p className="text-xl font-semibold capitalize">
                          {trip?.hotel?.country}
                        </p>
                        {/* location detail */}
                        <div className="">
                          <p>{trip?.hotel?.category}</p>
                          <p>{trip?.hotel?.location}</p>
                        </div>
                        {/* room detail */}
                        <div>
                          <p>
                            Room No.{" "}
                            <span className="font-bold text-white">
                              {trip?.hotel?.roomNumber}
                            </span>
                          </p>
                          <p>{trip?.roomType}</p>
                        </div>
                        {/* payment detail */}
                        <div className="">
                          <p>{trip?.paymentStatus}</p>
                          <p>&#8377;{trip?.hotel?.price}</p>
                        </div>

                        <div className="flex-col">
                          <p className="self-start text-lg font-medium text-black">
                            Address :
                          </p>
                          <p className="text-black/80">
                            {trip?.hotel?.address}
                          </p>
                        </div>

                        <button
                          className="p-1 transition-all border rounded active:scale-95 active:bg-white active:text-rose-500"
                          onClick={() =>
                            setShowDetails((prev) => ({
                              ...prev,
                              [trip?._id]: false,
                            }))
                          }
                        >
                          Show less
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* end trip deatail */}
          </div>
        </div>
      )}
    </>
  );
}

export default Trips;
