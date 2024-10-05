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

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);
  const isLogin = useLoginStore((state) => state.isLogin);
  const [showDetail, setShowDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const baseURL = useBaseURL((state) => state.baseURL);

  useEffect(() => {
    fetch(`${baseURL}/book/reservation`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.status) {
          case "success": {
            // console.log(data);
            setLoading(false);
            setReservations(data.reservations);
            const showDetailsKey = data.reservations.reduce(
              (acc, reservation) => {
                acc[reservation._id] = false;
                return acc;
              },
              {}
            );
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
  }, [isLogin]);

  const setIsNavMiddle = useNavMiddleStore((state) => state.setIsNavMiddle);
  useEffect(() => {
    setIsNavMiddle(false);
  }, []);

  // mx-auto max-w-[1080px] pt-12 w-full
  const override = {
    display: "block",
    margin: "auto",
  };

  if (loading) {
    return <ClipLoader cssOverride={override} size={51} />;
  }

  if (reservations.length === 0) {
    return (
      <>
        <AuthenticateModel />
        <div className="">
          <Navbar />
        </div>
        <hr />
        <div className="max-w-[1080px] mx-auto pt-12 px-12">
          <div className="text-3xl text-center max-[949px]:mt-10">
            No Reservations Yet?
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
          <h1 className="text-3xl font-semibold max-[949px]:mt-10">
            Reservations
          </h1>
          <br />
          <hr />
          <div className="grid grid-cols-1 mt-12 md:gap- md:grid-cols-2 md-gap-0 md:justify-items-around lg:grid-cols-3 gap-x-3 gap-y-8">
            {/* main reservation container above div */}
            {/* trip deatail */}
            {reservations?.map((reservation) => {
              return (
                <div
                  key={reservation._id}
                  className="relative rounded-3xl mx-auto w-96 sm:w-96 md:w-[85%] lg:w-72 reserve-shadow"
                >
                  <div
                    className={`w-full aspect-[2/1] bg-cover bg-center rounded-t-3xl`}
                    style={{
                      backgroundImage: `url(${reservation?.hotel?.image_url[0]})`,
                    }}
                  >
                    <button className="absolute p-1 bg-white rounded-full inset-2 w-fit h-fit active:scale-95 ">
                      <MdDelete className="text-red-500" size={24} />
                    </button>
                  </div>
                  <div className="px-5 pt-3">
                    {/* flex column if need */}
                    <p className="font-mono text-xs text-stone-500">
                      {new Date(reservation.checkInDate).toDateString()} -{" "}
                      {new Date(reservation.checkOutDate).toDateString()}
                    </p>
                    <h2 className="text-xl font-medium">
                      {reservation.hotel.location}
                    </h2>
                    <div className="flex items-center gap-3 py-2 text-stone-600">
                      {/* flex */}
                      <div>
                        <img
                          src={reservation.hotel.image_url[0]}
                          alt=""
                          width={32}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex items-center justify-between w-10 gap-1 grow">
                        <p className="w-full overflow-hidden text-nowrap">
                          {reservation.hotel.description}{" "}
                        </p>
                        <Link
                          to={`/rooms/${reservation.hotel._id}`}
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
                      !showDetail[reservation._id] && "text-center"
                    }`}
                  >
                    {!showDetail[reservation._id] ? (
                      <div className="px-4">
                        <button
                          className="px-1 py-1 border rounded active:scale-95"
                          onClick={() =>
                            setShowDetails((prev) => ({
                              ...prev,
                              [reservation._id]: true,
                            }))
                          }
                        >
                          Show more details
                        </button>
                      </div>
                    ) : (
                      <div className="px-3 w-full scale-90 py-1 [&>div:nth-child(n)]:flex [&>div:nth-child(n)]:justify-between [&>div:nth-child(n)]:items-center [&>*:nth-child(n)]:mb-2 absolute left-1/2 bg-rose-500 text-white reserve-shadow rounded-xl z-10">
                        <p className="text-xl font-semibold capitalize">
                          {reservation.hotel.country}
                        </p>
                        {/* location detail */}
                        <div className="">
                          <p>{reservation.hotel.category}</p>
                          <p>{reservation.hotel.location}</p>
                        </div>
                        {/* room detail */}
                        <div>
                          <p>
                            Room No.{" "}
                            <span className="font-bold text-white">
                              {reservation.hotel.roomNumber}
                            </span>
                          </p>
                          <p>{reservation.roomType}</p>
                        </div>
                        {/* payment detail */}
                        <div className="">
                          <p>{reservation.paymentStatus}</p>
                          <p>&#8377;{reservation.hotel.price}</p>
                        </div>

                        <div className="flex-col">
                          <p className="self-start text-lg font-medium text-black">
                            Address :
                          </p>
                          <p className="text-black/80">
                            {reservation.hotel.address}
                          </p>
                        </div>

                        <button
                          className="p-1 transition-all border rounded active:scale-95 active:bg-white active:text-rose-500"
                          onClick={() =>
                            setShowDetails((prev) => ({
                              ...prev,
                              [reservation._id]: false,
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

export default Reservation;
