import React, { useEffect, useState } from "react";
import NavAirbnbSetup from "./NavAirbnbSetup";
import AuthenticateModel from "../modals/AuthenticateModel";
import Dashboard from "./Dashboard";
import BarLoader from "react-spinners/BarLoader";
import { useBaseURL, useLoginStore } from "../../../store/credentialStore";

function AirbnbYHome() {
  const baseURL = useBaseURL((state) => state.baseURL);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLogin = useLoginStore((state) => state.isLogin);
  useEffect(() => {
    fetch(`${baseURL}/hotel/dashboard`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setShowDashboard(true);
        }
      })
      .catch((err) => {
        console.log("Error fetching dashboard data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isLogin]);
  if (loading) {
    return <BarLoader color="#ff006b" width={"100%"} />;
  }

  if (showDashboard || (showDashboard && isLogin)) {
    return <Dashboard />;
  }
  return (
    <>
      <AuthenticateModel />
      <NavAirbnbSetup />
      <div className="mx-auto max-w-[1275px] pt-36 px-20 max-[1127px]:px-0">
        <h1 className="text-5xl font-semibold text-center max-[1127px]:text-left max-[1127px]:text-4xl max-[1127px]:pl-10 max-[660px]:text-[5vw]">
          Airbnb it easily with Airbnb Setup
        </h1>
        <div className="pt-12 ">
          <img
            src="https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?im_w=2560&im_q=highq"
            alt=""
            className="w-full"
          />
        </div>
        <div className="grid max-[1127px]:px-14 grid-cols-3 max-[1127px]:grid-cols-1 max-[1127px]:gap-8 gap-20 [&>div>h1:nth-child(n)]:text-lg [&>div>h1:nth-child(n)]:font-semibold pt-10 [&>div>p:nth-child(n)]:font-medium [&>div>p:nth-child(n)]:text-black/70 [&>div>p:nth-child(n)]:pt-1 pb-10">
          {/* 0 */}
          <div>
            <h1>One-to-one guidance from a Superhost</h1>
            <p>
              We’ll match you with a Superhost in your area, who’ll guide you
              from your first question to your first guest – by phone, video
              call or chat.
            </p>
          </div>
          {/* 1 */}
          <div>
            <h1>An experienced guest for your first booking</h1>
            <p>
              For your first booking, you can choose to welcome an experienced
              guest who has at least three stays and a good track record on
              Airbnb.
            </p>
          </div>
          {/* 2 */}
          <div>
            <h1>Specialised support from Airbnb</h1>
            <p>
              New Hosts get one-tap access to specially trained Community
              Support agents who can help with everything from account issues to
              billing support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AirbnbYHome;
