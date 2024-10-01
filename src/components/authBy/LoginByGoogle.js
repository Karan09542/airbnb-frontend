import { useGoogleLogin } from "@react-oauth/google";
const useLoginByGoogle = ({formData, setFormData, setIsLoginGoogle})=> {
        const loginByGoogle = useGoogleLogin({

            onSuccess: async (tokenResponse) => {
              try {
                const res = await fetch(
                  "https://www.googleapis.com/oauth2/v3/userinfo",
                  {
                    headers: {
                      Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                  }
                );
                const data = await res.json();
                setFormData({
                    email: data?.email,
                    phone: "",
                    firstName: data?.given_name,
                    lastName: data?.family_name,
                    password: "",
                    passwordConfirm: "",
                    dob: "",
                })
                setIsLoginGoogle(true)
              } catch (err) {
                console.log(err);
              }
            },
          });
    return {loginByGoogle}    
}
export default useLoginByGoogle;