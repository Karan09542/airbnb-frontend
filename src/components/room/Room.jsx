import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { FaSmileBeam } from "react-icons/fa";
import Authfield from "../Authfield";
import { IoWifi } from "react-icons/io5";
import { HiOutlineTv } from "react-icons/hi2";
import { MdOutlineRoomService } from "react-icons/md";
import { IoIosSnow } from "react-icons/io";
import { MdCoffeeMaker } from "react-icons/md";
import Toiletries from "../../assets/toiletries.svg?react";
import { PiCarThin } from "react-icons/pi";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { FiChevronLeft } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import Navbar from "../Navbar";
import {
  useBaseURL,
  useFormDataStore,
  useNavMiddleStore,
  useOpenModalStore,
} from "../../../store/credentialStore";
import useOutsideClose from "../../hooks/useOutsideClose";
import Validity from "../Validity";
import { toast } from "react-toastify";
import AuthenticateModel from "../modals/AuthenticateModel";

function Room() {
  const params = useParams();
  const [hotel, setHotel] = useState({});
  const [isFatching, setIsFatching] = useState(true);

  const baseURL = useBaseURL((state) => state.baseURL);

  useEffect(() => {
    fetch(`${baseURL}/hotel/rooms/${params.hotelId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHotel(data?.hotel);
        setIsFatching(false);
        // console.log(data?.hotel);
      })
      .catch((err) => {
        console.log("Error fetching room", err);
        setIsFatching(false);
      });
  }, []);

  const openModel = useOpenModalStore((state) => state.openModel);
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);
  const setFormData = useFormDataStore((state) => state.setFormData);
  useEffect(() => {
    if (openModel === null) {
      setFormData({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
        dob: "",
      });
    }
  }, [openModel]);

  const servicesIcons = {
    wifi: <IoWifi size={26} color="#44403c" />,
    television: <HiOutlineTv size={26} color="#44403c" />,
    roomService: <MdOutlineRoomService size={26} color="#44403c" />,
    airConditioning: <IoIosSnow size={26} color="#44403c" />,
    coffeeTeaMaker: <MdCoffeeMaker size={26} color="#44403c" />,
    toiletries: <Toiletries width={26} height={26} fill="#44403c" />,
    parking: <PiCarThin size={26} color="#44403c" />,
    laundryService: <MdOutlineLocalLaundryService size={26} color="#44403c" />,
  };

  const [isRoomDrop, setIsRoomDrop] = useState(false);
  const [isPaymentDrop, setIsPaymentDrop] = useState(false);
  const [roomType, setRoomType] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const roomTypeRef = useRef(null);
  const paymentStatusRef = useRef(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const setIsNavMiddle = useNavMiddleStore((state) => state.setIsNavMiddle);

  useEffect(() => {
    setIsNavMiddle(false);
  }, []);
  useOutsideClose({
    setState: setIsRoomDrop,
    reference: roomTypeRef,
    arg: false,
  });
  useOutsideClose({
    setState: setIsPaymentDrop,
    reference: paymentStatusRef,
    arg: false,
  });

  // user from cookie
  const [bookingData, setBookingData] = useState({
    hotel: params.hotelId,
    checkInDate: "",
    checkOutDate: "",
    paymentStatus: paymentStatus,
    roomType: roomType,
  });

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      roomType,
    }));
  }, [roomType]);

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      paymentStatus,
    }));
  }, [paymentStatus]);

  function handleBookingData(e) {
    setBookingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [errors, setErrors] = useState({});
  async function verifyAndReserve(verifyAndReserveFlag) {
    let tempErrors = {};

    // Checking if each required field is filled
    if (!bookingData.checkInDate)
      tempErrors.checkInDate = "check-in date is required";
    if (bookingData.checkOutDate <= bookingData.checkInDate)
      tempErrors.checkOutDate = "check-out must be greater than check-in date";
    if (!bookingData.paymentStatus)
      tempErrors.paymentStatus = "payment-status is required";
    if (!bookingData.roomType) tempErrors.roomType = "room-type is required";

    setErrors(tempErrors);
    if (verifyAndReserveFlag && Object.keys(tempErrors).length === 0) {
      await fetch(`${baseURL}/book`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(bookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          switch (data.status) {
            case "success": {
              toast.success("Reservation successfull");
              break;
            }
            case "fail": {
              toast.error(data.message);
              setOpenModel("login");
              break;
            }
            case 409:
              toast.error(data.message);
          }
        })
        .catch((err) => console.log(err, "सीताराम! Reservation"));
    }
  }

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false;
      return;
    }
    verifyAndReserve();
  }, [bookingData]);

  useEffect(() => {
    document.title = hotel?.location;
  });
  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  }

  if (isFatching) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <AuthenticateModel />

      {showAllPhotos ? (
        <>
          <div className="flex items-center justify-between [&_div:nth-child(n)]:flex [&_div:nth-child(n)]:items-center [&_div:nth-child(n)]:gap-2 fixed w-full pl-5 pr-1 top-0 pt-3 pb-5 bg-white select-none">
            <div
              className="p-1 rounded-full hover:bg-stone-100 active:scale-95"
              onClick={() => setShowAllPhotos(false)}
            >
              <FiChevronLeft size={24} color="#000000c9" />{" "}
            </div>
            <div>
              <div
                className="px-2 py-1.5 rounded-md hover:bg-stone-100 active:scale-95"
                onClick={handleShare}
              >
                <FiShare size={18} color="#0000009c" />{" "}
                <span className="text-sm font-medium underline">Share</span>
              </div>
              <div className="px-2 py-1.5 rounded-md hover:bg-stone-100 active:scale-95">
                <CiHeart size={18} />{" "}
                <span className="text-sm font-medium underline">Save</span>
              </div>
            </div>
          </div>
          <div className="max-w-[1080px] mx-auto mt-24">
            <div className="grid grid-cols-2 gap-2 mx-32 mt-14 [&>img:nth-child(3n-2)]:col-[1/3] pb-10 [&>img:not(:nth-child(3n-2))]:h-96">
              {hotel?.image_url?.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="hotel img"
                  width={"100%"}
                  className={` hover:brightness-90}`}
                ></img>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[1080px] mx-auto">
            <Navbar />
          </div>
          <hr />

          <div className="mx-auto max-w-[1080px] pt-12 px-5">
            <h1 className="text-[1.7rem] font-semibold text-stone-800 py-3">
              {hotel?.location}
            </h1>
            <div
              className={`[&>img:not(:nth-child(3n-2))]:h-full ${
                !showAllPhotos &&
                "[&>*:nth-child(n)]:w-full grid grid-cols-4 gap-3 [&>*:nth-child(1)]:col-span-2 [&>*:nth-child(1)]:row-span-2 [&>*:nth-child(1)]:rounded-l-xl [&>*:nth-child(3)]:rounded-tr-lg [&>*:nth-child(5)]:rounded-br-lg"
              }
          `}
            >
              {hotel?.image_url?.slice(0, 5).map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="hotel img"
                  className={`max-h-[514px] hover:brightness-90 ${
                    i === 4 && "col-[4] row-[2]"
                  }`}
                ></img>
              ))}
              <button
                className="flex mt-auto items-center col-[4] row-[2] gap-1 border bg-white !w-40 ml-3 mb-6 h-fit z-10 justify-center py-1 rounded-md border-black font-medium text-stone-700 active:scale-95 transition-all duration-100"
                onClick={() => setShowAllPhotos(!showAllPhotos)}
              >
                <PiDotsNineBold size={21} /> Show all photos
              </button>
            </div>
            <div className="flex mt-3 gap-26">
              {/* about hotel & location */}
              <div className="w-full [&>div:nth-child(n)]:py-5 pr-20">
                {/* location city country */}
                <div className="!pb-7">
                  <p className="text-2xl font-semibold">
                    {hotel?.city}, {hotel?.state}, {hotel?.country}{" "}
                  </p>
                  <p>similar things as shown in the images</p>
                  <p className="flex items-center gap-1 text-stone-950">
                    <IoIosStar /> {hotel?.rating?.toFixed(1)}
                  </p>
                </div>
                <hr />
                {/* hoted by hotel name */}
                <div className="py-5">
                  <p className="flex gap-3 text-lg font-semibold ">
                    {hotel?.user?.image ? (
                      <img
                        src={hotel?.user?.image}
                        className="w-10 rounded-full aspect-square"
                      />
                    ) : (
                      <FaSmileBeam size={30} fill="#FFC107" />
                    )}{" "}
                    Hosted by {hotel?.name}{" "}
                  </p>
                  <p className="ml-11">{hotel?.category}</p>
                </div>
                <hr />
                <div>{hotel?.description}</div>
                <hr />
                <div>
                  <h2 className="text-[1.4rem] font-semibold text-slate-800 py-4">
                    What this place offers
                  </h2>
                  {hotel?.amenities?.services.map((amenity) => {
                    return (
                      Object.keys(servicesIcons).includes(amenity) && (
                        <p
                          key={amenity}
                          className="flex text-[1.05rem] leading-10 items-center gap-3 text-stone-700"
                        >
                          {servicesIcons[amenity]}{" "}
                          {amenity.slice(0, 1).toUpperCase() + amenity.slice(1)}
                        </p>
                      )
                    );
                  })}
                </div>
                <hr />
                <div>{hotel?.amenities?.description}</div>
              </div>
              {/* check IN/Out box */}

              <div className="w-[36rem] pt-7">
                <div className="sticky p-5 rounded-xl reserve-shadow top-8">
                  <p className="text-2xl font-semibold">
                    &#8377;{hotel?.price.toLocaleString("en-IN")}{" "}
                    <small className="font-normal">hapta</small>
                  </p>
                  {/* Form Booking */}
                  <div className="scale-[0.98]">
                    <div className="[&>*:nth-child(n)]:-mt-[1px] [&>div>*:nth-child(n)]:-mr-[1px] py-5">
                      <div className="flex">
                        <Authfield
                          field_name="CHECK-IN"
                          name="checkInDate"
                          vlaue={bookingData?.checkInDate}
                          className="rounded-tl-lg"
                          onChange={handleBookingData}
                        />
                        <Authfield
                          field_name="CHECK-OUT"
                          name="checkOutDate"
                          vlaue={bookingData?.checkOutDate}
                          className="rounded-tr-lg"
                          onChange={handleBookingData}
                        />
                      </div>
                      {/* Room type */}
                      <div className="relative -top-px" ref={roomTypeRef}>
                        <div>
                          {/* select */}
                          <div
                            className={`${
                              isRoomDrop && "rounded-md scale-[1.01]"
                            } py-3.5 flex justify-between px-3 items-center text-[0.89em] text-stone-600 capitalize`}
                            style={{
                              border: !isRoomDrop
                                ? "1px solid rgb(118,118,118)"
                                : "2px solid black",
                            }}
                            onClick={() => setIsRoomDrop(!isRoomDrop)}
                          >
                            <span>{roomType || "Room Type"}</span>{" "}
                            {!isRoomDrop ? (
                              <IoIosArrowDown size={20} color="#4b4b4b" />
                            ) : (
                              <IoIosArrowUp size={20} />
                            )}
                          </div>
                          {/* select option */}
                          {isRoomDrop && (
                            <div className="absolute z-10 w-80 rounded-md -right-[0.1rem] py-5 px-4 bg-[white] reserve-shadow [&>p:nth-child(n)]:text-[1.05rem] [&>p:nth-child(n)]:leading-8 [&>p:nth-child(n)]:font-semibold">
                              <p
                                onClick={(elem) => {
                                  setRoomType(
                                    elem?.currentTarget?.dataset?.roomType
                                  );
                                  setIsRoomDrop(false);
                                }}
                                data-room-type="single"
                                className="px-1 hover:bg-slate-100 active:scale-[0.98]"
                              >
                                Single
                              </p>
                              <p
                                onClick={(elem) => {
                                  setRoomType(
                                    elem?.currentTarget?.dataset?.roomType
                                  );
                                  setIsRoomDrop(false);
                                }}
                                data-room-type="deluxe"
                                className="px-1 hover:bg-slate-100 active:scale-[0.98]"
                              >
                                Deluxe
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Payment type */}
                      <div className="relative -top-px" ref={paymentStatusRef}>
                        <div>
                          {/* select */}
                          <div
                            className={`${
                              isPaymentDrop && "rounded-md scale-[1.01]"
                            } py-3.5 flex justify-between px-3 items-center text-[0.89em] text-stone-600 capitalize rounded-b-md`}
                            style={{
                              border: !isPaymentDrop
                                ? "1px solid rgb(118,118,118)"
                                : "2px solid black",
                            }}
                            onClick={() => setIsPaymentDrop(!isPaymentDrop)}
                          >
                            <span>{paymentStatus || "Payment type"}</span>{" "}
                            {!isPaymentDrop ? (
                              <IoIosArrowDown size={20} color="#4b4b4b" />
                            ) : (
                              <IoIosArrowUp size={20} />
                            )}
                          </div>
                          {/* select option */}
                          {isPaymentDrop && (
                            <div className="absolute z-10 w-80 rounded-md -right-[0.1rem] py-5 px-4 bg-[white] reserve-shadow [&>p:nth-child(n)]:text-[1.05rem] [&>p:nth-child(n)]:leading-8 [&>p:nth-child(n)]:font-semibold">
                              <p
                                onClick={(elem) => {
                                  setPaymentStatus(
                                    elem?.currentTarget?.dataset?.paymentStatus
                                  );
                                  setIsPaymentDrop(false);
                                }}
                                data-payment-status="paid"
                                className="px-1 hover:bg-slate-100 active:scale-[0.98]"
                              >
                                Paid
                              </p>
                              <p
                                onClick={(elem) => {
                                  setPaymentStatus(
                                    elem?.currentTarget?.dataset?.paymentStatus
                                  );
                                  setIsPaymentDrop(false);
                                }}
                                data-payment-status="pending"
                                className="px-1 hover:bg-slate-100 active:scale-[0.98]"
                              >
                                Pending
                              </p>
                              <p
                                onClick={(elem) => {
                                  setPaymentStatus(
                                    elem?.currentTarget?.dataset?.paymentStatus
                                  );
                                  setIsPaymentDrop(false);
                                }}
                                data-payment-status="failed"
                                className="px-1 hover:bg-slate-100 active:scale-[0.98]"
                              >
                                failed
                              </p>
                            </div>
                          )}
                          {errors.checkInDate && (
                            <Validity message={errors.checkInDate} />
                          )}
                          {errors.checkOutDate && (
                            <Validity message={errors.checkOutDate} />
                          )}
                          {errors.roomType && (
                            <Validity message={errors.roomType} />
                          )}
                          {errors.paymentStatus && (
                            <Validity message={errors.paymentStatus} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => verifyAndReserve(true)}
                      className="text-center bg-gradient-to-r from-[#E51D4F] to-[#D90568] py-[10px] text-white font-semibold text-[1.2em] rounded-md active:scale-95 ease-in-out duration-75"
                    >
                      <button>Reserve</button>
                    </div>
                    <p className="my-3 text-[0.96rem] text-center">
                      You won't be charged yet
                    </p>
                    <p className="flex justify-between pt-2 font-semibold ">
                      <span className="underline underline-offset-2">
                        &#8377;{hotel?.price.toLocaleString("en-IN")} x 5 weeks
                      </span>{" "}
                      <span>
                        &#8377;
                        {parseFloat(hotel?.price * 5).toLocaleString("en-IN")}
                      </span>
                    </p>
                    <hr className="mt-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Room;
