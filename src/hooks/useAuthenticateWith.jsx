import { toast } from "react-toastify";

export const useSignUp = (userData, setOpenModel, setIsLogin) => {
  fetch(`/user/signup`, {
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
  const response = fetch(`/user/login_signin`, {
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
