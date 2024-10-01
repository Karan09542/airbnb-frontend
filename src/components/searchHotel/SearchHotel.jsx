import { useEffect, useState } from "react";
import "../../App.css";
import Navbar from "../Navbar";
import Options from "../../components/Options";
import Footer from "../../components/footer/Footer";
import {
  useBigSearchStore,
  useFormDataStore,
  useNavMiddleStore,
  useOpenModalStore,
} from "../../../store/credentialStore";
import AuthenticateModel from "../../components/modals/AuthenticateModel";
import SearchHotelCard from "../card/SearchHotelCard";

function SearchHotel() {
  const openModel = useOpenModalStore((state) => state.openModel);
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

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("सीताराम साईबाबा");
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const setIsNavMiddle = useNavMiddleStore((state) => state.setIsNavMiddle);
  useEffect(() => {
    setIsNavMiddle(true);
  }, []);

  const isBig = useBigSearchStore((state) => state.isBig);

  return (
    <>
      <AuthenticateModel />
      <main className="mx-auto max-w-[1920px]">
        <div className="sticky top-0 z-10 bg-white">
          <div className={`${isBig && "min-h-[169px]"}`}>
            <Navbar />
          </div>
          <div
            className={`relative -z-10 ${
              width < 950
                ? isBig
                  ? "pt-[5.5rem]"
                  : "pt-4"
                : isBig
                ? "pt-12"
                : "pt-4"
            }`}
          >
            <Options
              className={
                "mx-20 max-[600px]:mx-auto max-[600px]:px-5 max-[600px]:w-full max-[1045px]:w-full max-[1045px]:mx-auto max-[1045px]:px-10"
              }
            />
          </div>
        </div>
        <div className="min-[640px]:mx-10 max-[638px]:mx-12">
          <SearchHotelCard />
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default SearchHotel;
