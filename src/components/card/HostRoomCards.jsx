import React, { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import {
  useHostDataStore,
  useRefereshRoomStore,
} from "../../../store/credentialStore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function HostRoomCards({ setValue }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const setHostData = useHostDataStore((state) => state.setHostData);
  const reloadRooms = useRefereshRoomStore((state) => state.reloadRooms);
  const setReloadRooms = useRefereshRoomStore((state) => state.setReloadRooms);

  useEffect(() => {
    fetch(`/hotel/host/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.rooms);
      })
      .finally(() => setLoading(false));
  }, [reloadRooms]);

  const handleDeleteRoom = async (room) => {
    await fetch(`/hotel/host/room/delete`, {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ roomId: room._id }),
    })
      .then((res) => {
        if (res.status === 200) {
          delete rooms[room];
          toast.success("deletion successfull");
          setReloadRooms();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="">
        {loading ? (
          <div className="m-auto">
            <SyncLoader color="#ff006b" margin={3} size={10} />
          </div>
        ) : (
          <>
            {rooms.length === 0 ? (
              <div className="flex h-[20vh] text-3xl">
                <p className="m-auto">No room host yet!</p>
              </div>
            ) : (
              <div className=" [&>div:nth-child(n)]:mb-3 w-full">
                {rooms.map((room) => {
                  return (
                    <div
                      key={room._id}
                      className="flex flex-col items-start justify-start w-full px-4 py-4 dark:bg-gray-800 bg-gray-50 md:py-6 md:p-6 xl:p-8 rounded-xl"
                    >
                      <p className="text-lg font-semibold leading-6 text-gray-800 capitalize md:text-xl dark:text-white xl:leading-5">
                        {room.name}
                      </p>
                      <div className="flex flex-col items-start justify-start w-full mt-4 md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
                        {/* images */}
                        <div className="w-full pb-4 md:pb-8 md:w-40">
                          <Link to={`/rooms/${room._id}`}>
                            <img
                              className="hidden w-full md:block rounded-xl aspect-square"
                              src={room.image_url[0]}
                              alt="room"
                            />
                          </Link>
                          <Link to={`/rooms/${room._id}`}>
                            <img
                              className="w-full md:hidden rounded-xl aspect-square"
                              src={room.image_url[0]}
                              alt="room"
                            />
                          </Link>
                        </div>
                        {/* City state country */}
                        <div className="flex flex-col items-start justify-between w-full pb-8 space-y-4 border-b border-gray-200 md:flex-row md:space-y-0">
                          <div className="flex flex-col items-start justify-start w-full space-y-8">
                            <h3 className="text-xl font-semibold leading-6 text-gray-800 capitalize dark:text-white xl:text-2xl">
                              {room.location}
                            </h3>
                            <div className="flex flex-col items-start justify-start space-y-2">
                              <p className="text-sm leading-none text-gray-800 dark:text-white">
                                <span className="text-gray-300 dark:text-gray-400">
                                  City:{" "}
                                </span>{" "}
                                {room.city}
                              </p>
                              <p className="text-sm leading-none text-gray-800 dark:text-white">
                                <span className="text-gray-300 dark:text-gray-400">
                                  State:{" "}
                                </span>{" "}
                                {room.state}
                              </p>
                              <p className="text-sm leading-none text-gray-800 dark:text-white">
                                <span className="text-gray-300 dark:text-gray-400">
                                  Country:{" "}
                                </span>{" "}
                                {room.country}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start justify-between w-full space-x-8">
                            <p className="text-base leading-6 dark:text-white xl:text-lg">
                              <span className="font-semibold">Room no. : </span>
                              {room.roomNumber}
                            </p>
                            <p className="text-base font-semibold leading-6 dark:text-white xl:text-lg">
                              &#8377;{room.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end w-full gap-2 px-5 pt-5">
                        <button
                          onClick={() => {
                            setHostData(room);
                            setValue("hotelId", room._id);
                            console.log(room);
                          }}
                          className="px-2.5 py-1.5 text-white bg-blue-500 rounded-lg transition-all active:scale-95"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteRoom(room);
                          }}
                          className="px-2.5 py-1.5 text-white bg-red-500 rounded-lg transition-all active:scale-95"
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default HostRoomCards;
