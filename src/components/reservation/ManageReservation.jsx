import React, { useEffect, useState } from "react";
import AuthenticateModel from "../modals/AuthenticateModel";
import NavBar from "../Navbar";
import { useNavMiddleStore } from "../../../store/credentialStore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ManageReservation() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectStatus, setSelectStatus] = useState("pending");

  const setIsNavMiddle = useNavMiddleStore((state) => state.setIsNavMiddle);

  function handleReservationStatus(bookingId, reservationStatus) {
    fetch(`/book/updateReservationStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId, reservationStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  }
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  useEffect(() => {
    setIsNavMiddle(false);
  }, []);
  useEffect(() => {
    fetch(`/book/BookingUserDetails?status=${selectStatus || "pending"}`)
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings))
      .finally(() => {
        setLoading(false);
      });
  }, [selectStatus]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <AuthenticateModel />
      <div className="max-w-[1920px] mx-auto">
        <NavBar />
      </div>
      <hr />
      <div className="max-w-[1920px] mx-auto px-16">
        <h1 className="py-5 text-3xl font-medium">ManageReservation</h1>
        <hr />
        <div className="flex gap-6 px-5 pt-2">
          {["pending", "accepted", "rejected"].map((status) => {
            return (
              <button
                key={status}
                className={`capitalize relative pb-1 ${
                  selectStatus === status
                    ? "after:h-[2px] after:w-full after:absolute after:right-0 after:bottom-0 after:bg-black after:opacity-100 font-medium"
                    : "hover:after:!opacity-20"
                } 
              after:transition-opacity after:duration-[1ms] hover:after:h-[2px] hover:after:w-full hover:after:absolute hover:after:right-0 hover:after:bottom-0 hover:after:bg-black`}
                onClick={() => {
                  setSelectStatus(status);
                }}
              >
                {status}
              </button>
            );
          })}
        </div>
        {bookings?.length === 0 || bookings?.length === undefined ? (
          <div className="flex h-[20vh] text-3xl">
            <p className="m-auto">NoThing!</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 px-5 pb-8">
            {bookings?.map((booking) => {
              return (
                <div
                  key={booking._id}
                  className="box-border p-3 mt-8 bg-white border shadow-md w-fit rounded-xl"
                >
                  <div className="flex items-center justify-between gap-5 pb-2">
                    {/* user info */}
                    <div className="h-[100px] aspect-square">
                      <Link to={`/rooms/${booking?.hotel?._id}`}>
                        <img
                          src={booking?.hotel?.image_url[0]}
                          className="h-full rounded-xl"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="grow">
                      <div className="flex items-center justify-between gap-2">
                        <h1 className="text-xl font-medium font-poppins text-rose-500">
                          {booking?.user?.username}
                        </h1>

                        <img
                          src={booking?.user?.image}
                          className="rounded-full w-[36px] aspect-square"
                          alt="hotel"
                        />
                      </div>
                      <p className="pb-1">{booking?.user?.email}</p>
                      <p className="font-mono text-sm">
                        {formatDate(booking?.checkInDate)}
                        {" - "}
                        {formatDate(booking?.checkOutDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-5">
                    {booking?.reservationStatus === "pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleReservationStatus(booking._id, "accepted")
                        }
                        className="px-2 py-1 text-white transition-all bg-green-500 rounded-lg active:scale-95"
                      >
                        Accepted
                      </button>
                    )}
                    {booking?.reservationStatus === "pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleReservationStatus(booking._id, "rejected")
                        }
                        className="px-2 py-1 text-white transition-all bg-red-500 rounded-lg active:scale-95"
                      >
                        Rejected
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ManageReservation;
