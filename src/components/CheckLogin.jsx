import { useEffect, useRef } from "react";
import {
  useAccessTokenStore,
  useBaseURL,
  useLoginStore,
  useOpenModalStore,
  useShouldFetchUserStore,
  useUserStore,
} from "../../store/credentialStore";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { set } from "react-hook-form";

function CheckLogin({ children }) {
  const setIsLogin = useLoginStore((state) => state.setIsLogin);
  const isLogin = useLoginStore((state) => state.isLogin);
  const setUser = useUserStore((state) => state.setUser);
  const shouldFetchUser = useShouldFetchUserStore(
    (state) => state.shouldFetchUser
  );
  const setShouldFetchUser = useShouldFetchUserStore(
    (state) => state.setShouldFetchUser
  );

  const baseURL = useBaseURL((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);

  const timeoutAccTokenRef = useRef(null);
  const setOpenModel = useOpenModalStore((state) => state.setOpenModel);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(`${baseURL}/user`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
        const data = await res.json();

        if (data.status === 401 || data?.message === "NOT_LOGGED_IN") {
          setIsLogin(false);
        } else if (
          data.status === "fail" &&
          data?.message === "Password has been changed. Please login again!"
        ) {
          setIsLogin(false);
          toast.error(data.message);
        } else if (data.status === "success") {
          setIsLogin(true);
          setShouldFetchUser(true); // Trigger fetching user data
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLogin(false);
      }
    };
    console.log("महादेव");
    checkLoginStatus();
  }, [isLogin]);

  // Fetch user data only when needed
  useEffect(() => {
    if (shouldFetchUser) {
      const fetchUserData = async () => {
        try {
          const res = await fetch(`${baseURL}/user`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          }); // Assuming this is your endpoint
          const data = await res.json();
          setUser(data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
      setShouldFetchUser(false); // Reset the trigger after fetching data
    }
  }, [shouldFetchUser, setUser]);

  const refreshToken = async () => {
    try {
      const res = await fetch(`${baseURL}/user/refresh-token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.status === "success") {
        setAccessToken(data.access_token);
        setIsLogin(true);
        setOpenModel(null);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  const handleRefreshToken = () => {
    if (accessToken) {
      let refreshTime = jwtDecode(accessToken).exp - Date.now() / 1000;
      refreshTime = refreshTime - 50; // 50 seconds before expiration

      if (timeoutAccTokenRef.current) {
        clearTimeout(timeoutAccTokenRef.current);
      }
      timeoutAccTokenRef.current = setTimeout(() => {
        refreshToken();
      }, refreshTime * 1000);
    }
  };

  useEffect(() => {
    if (!accessToken) {
      refreshToken();
    } else {
      handleRefreshToken();
    }
  }, [accessToken]);

  return <>{children}</>;
}

export default CheckLogin;
