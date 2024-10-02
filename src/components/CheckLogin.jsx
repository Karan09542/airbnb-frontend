import { useEffect } from "react";
import {
  useBaseURL,
  useLoginStore,
  useShouldFetchUserStore,
  useUserStore,
} from "../../store/credentialStore";

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

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(`${baseURL}/user/isLogin`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();

        if (data.status === 401 || data?.message === "NOT_LOGGED_IN") {
          setIsLogin(false);
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
          const res = await fetch(`${baseURL}/user/isLogin`, {
            method: "POST",
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
  return <>{children}</>;
}

export default CheckLogin;
