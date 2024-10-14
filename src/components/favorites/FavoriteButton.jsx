import React, { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import {
  useAccessTokenStore,
  useBaseURL,
  useOpenModalStore,
  useShouldFetchUserStore,
  useUserStore,
} from "../../../store/credentialStore";
import { toast } from "react-toastify";

function FavoriteButton({ hotelId }) {
  const user = useUserStore((state) => state.user);
  const [favorites, setFavorites] = useState(user?.favorites || []);
  const setShouldFetchUser = useShouldFetchUserStore(
    (state) => state.setShouldFetchUser
  );
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  const baseURL = useBaseURL((state) => state.baseURL);

  useEffect(() => {
    setFavorites(user?.favorites || []);
  }, [user?.favorites]);

  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const handleFavroite = async (hotelId, isAdding) => {
    if (!user?.active) {
      toast.error("Please login to add favorites");
      setOpenModel("login");
      return;
    }
    try {
      const response = await fetch(
        `${baseURL}/hotel/setFavorite/${hotelId}?setFlag=${isAdding}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        toast.success(data.message);
        // Update local favorites based on the action
        setShouldFetchUser();
        if (isAdding) {
          setFavorites((prevFavorites) => [...prevFavorites, hotelId]);
        } else {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((id) => id !== hotelId)
          );
        }
      }
    } catch (error) {
      console.error("Error on updating favorites:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="absolute top-3 right-3">
      {favorites?.includes(hotelId) ? (
        <IoHeartSharp
          className="transition-all cursor-pointer text-rose-500 active:scale-95 hover:scale-110"
          size={21}
          onClick={() => handleFavroite(hotelId, false)}
        />
      ) : (
        <IoHeartOutline
          className="text-white transition-all cursor-pointer active:scale-95 hover:scale-110"
          size={21}
          onClick={() => handleFavroite(hotelId, true)}
        />
      )}
    </div>
  );
}

export default FavoriteButton;
