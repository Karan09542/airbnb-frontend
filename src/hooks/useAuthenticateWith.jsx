import { toast } from "react-toastify";
import { useBaseURL } from "../../store/credentialStore";

export const useSignUp = (userData, setOpenModel, setIsLogin) => {
  const baseURL = useBaseURL((state) => state.baseURL);

  fetch(`${baseURL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      data.status === "fail"
        ? toast.error(data.message)
        : toast.success("Sign up successful");
    })
    .catch((err) => console.log(err, "सीताराम"))
    .finally(() => {
      // Close modal after operation
      setOpenModel(null);
      setIsLogin(true);
    });
};

export const useLogin = (userData, setOpenModel, setIsLogin) => {
  const baseURL = useBaseURL((state) => state.baseURL);

  const response = fetch(`${baseURL}/user/login_signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        toast.success("Login successfull");
        setIsLogin(true);
      } else {
        toast.error(data?.message);
        setIsLogin(false);
      }
      setOpenModel(null);
    });
};
