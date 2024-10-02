import React, { useEffect } from "react";
import Navbar from "../Navbar";
import {
  useBaseURL,
  useHostDataStore,
  useNavMiddleStore,
  useRefereshRoomStore,
} from "../../../store/credentialStore";
import { useForm, useFieldArray } from "react-hook-form";
import HostField from "../HostField";
import Validity from "../Validity";
import { toast } from "react-toastify";
import AuthenticateModel from "../modals/AuthenticateModel";
import HostRoomCards from "../card/HostRoomCards";

function Dashboard() {
  const setIsNavMiddle = useNavMiddleStore((state) => state.setIsNavMiddle);
  const hostData = useHostDataStore((state) => state.hostData);
  useEffect(() => {}, [hostData]);
  useEffect(() => {
    setIsNavMiddle(false);
  }, [setIsNavMiddle]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: hostData,
    defaultValues: {
      hotelId: "",
    },
  });

  // Field array for managing multiple image URLs
  const { fields, append, remove } = useFieldArray({
    control,
    name: "image_url", // Aligning with your schema for image_url
  });

  // Managing checkboxes for amenities services
  const services = [
    "wifi",
    "television",
    "roomService",
    "airConditioning",
    "coffeeTeaMaker",
    "toiletries",
    "parking",
    "laundryService",
  ];
  const { fields: serviceFields } = useFieldArray({
    control,
    name: "amenities.services", // Path to amenities.services in the form
  });
  const setReloadRooms = useRefereshRoomStore((state) => state.setReloadRooms);

  const baseURL = useBaseURL((state) => state.baseURL);

  const onSubmit = async (data) => {
    await fetch(`${baseURL}/hotel/host`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setReloadRooms();
        }
      })
      .catch((err) => console.log("Error on fetching", err))
      .finally(() => reset());
  };

  return (
    <>
      <AuthenticateModel />
      <div>
        <Navbar />
        <hr />
      </div>
      <div className=" max-w-[1920px] mx-auto px-20 pt-3">
        <h1 className="text-3xl text-rose-500">Dashboard</h1>
        <p className="text-xl font-medium text-right text-rose-500">
          Post Your Rooms
        </p>
      </div>
      <div className="grid grid-cols-2 pt-10 max-w-[1920px] mx-auto px-20 gap-3">
        <div className="border-r-2 rounded-x max-h-[800px] overflow-y-auto scrollbar-thin px-5">
          <HostRoomCards setValue={setValue} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[800px] overflow-y-auto pt-5 scrollbar-thin"
        >
          <div className="xl:w-96 lg:w-80 [&>*:nth-child(n)]:mb-2 mx-auto ">
            {/* Hotel Name */}
            <HostField
              register={{
                ...register("name", {
                  required: {
                    value: true,
                    message: "Please provide hotel name.",
                  },
                }),
              }}
              field_name="Hotel Name"
              className={`rounded-lg`}
            />
            {errors.name && <Validity message={errors.name.message} />}

            {/* Location */}
            <HostField
              register={{
                ...register("location", {
                  required: {
                    value: true,
                    message: "Required hotel location.",
                  },
                }),
              }}
              field_name="Location"
              className={`rounded-lg`}
            />
            {errors.location && <Validity message={errors.location.message} />}

            {/* Address */}
            <HostField
              register={{
                ...register("address", {
                  required: { value: true, message: "Required hotel address" },
                  message: "Required hotel address.",
                }),
              }}
              field_name="Address"
              className={`rounded-lg`}
            />
            {errors.address && <Validity message={errors.address.message} />}

            {/* City and State */}
            <div className="flex gap-2">
              <div>
                <HostField
                  register={{
                    ...register("city", {
                      required: {
                        value: true,
                        message: "Please provide city name",
                      },
                      message: "Required hotel city.",
                    }),
                  }}
                  field_name="City"
                  className={`rounded-lg`}
                />
                {errors.city && <Validity message={errors.city.message} />}
              </div>
              <div>
                <HostField
                  register={{
                    ...register("state", {
                      required: {
                        value: true,
                        message: "Please provide state name",
                      },
                      message: "Required hotel state.",
                    }),
                  }}
                  field_name="State"
                  className={`rounded-lg`}
                />
                {errors.state && <Validity message={errors.state.message} />}
              </div>
            </div>

            {/* Country */}
            <HostField
              register={{
                ...register("country", {
                  required: {
                    value: true,
                    message: "Required country name",
                  },
                  message: "Required hotel country.",
                }),
              }}
              field_name="Country"
              className={`rounded-lg`}
            />
            {errors.country && <Validity message={errors.country.message} />}

            {/* Description */}
            <textarea
              {...register("description", {
                required: {
                  value: true,
                  message: "Required hotel description.",
                },
                message: "Required hotel description.",
              })}
              placeholder="Hotel Description"
              className={`rounded-lg w-full border border-[rgb(118,118,118)] px-2 py-2`}
            />
            {errors.description && (
              <Validity message={errors.description.message} />
            )}

            {/* Category */}
            <HostField
              register={{
                ...register("category", {
                  required: {
                    value: true,
                    message: "Required category",
                  },
                  message: "Required hotel category.",
                }),
              }}
              field_name="Category"
              className={`rounded-lg`}
            />
            {errors.category && <Validity message={errors.category.message} />}

            {/* Dynamic Image URLs */}
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Image URLs
              </label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`image_url.${index}`, {
                      required: "Please provide an image URL.",
                    })}
                    placeholder={`Image URL ${index + 1}`}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-2 py-1 text-white transition-all bg-red-500 rounded-lg active:scale-95"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append("")}
                className="px-4 py-2 mt-2 text-white transition-all bg-blue-500 rounded-lg active:scale-95"
              >
                Add Image URL
              </button>
              {errors.image_url && (
                <Validity message={errors.image_url.message} />
              )}
            </div>

            {/* Price and Room Number */}
            <div className="flex gap-2">
              <div>
                <HostField
                  register={{
                    ...register("price", {
                      required: {
                        value: true,
                        message: "Required hotel price",
                      },
                      message: "Required hotel price.",
                    }),
                  }}
                  field_name="Price"
                  className={`rounded-lg`}
                />
                {errors.price && <Validity message={errors.price.message} />}
              </div>
              <div>
                <HostField
                  register={{
                    ...register("roomNumber", {
                      required: {
                        value: true,
                        message: "Required hotel room number",
                      },
                      message: "Required hotel room number.",
                    }),
                  }}
                  field_name="Room Number"
                  className={`rounded-lg`}
                />
                {errors.roomNumber && (
                  <Validity message={errors.roomNumber.message} />
                )}
              </div>
            </div>
            <div>
              <HostField
                register={{
                  ...register("rating", {
                    required: "Please provide a rating.",
                    min: {
                      value: 1,
                      message: "Rating must be at least 1.",
                    },
                    max: {
                      value: 5,
                      message: "Rating cannot exceed 5.",
                    },
                  }),
                }}
                field_name="Rating (1-5)"
                type="number"
                className={`rounded-lg`}
              />
            </div>
            {errors.rating && <Validity message={errors.rating.message} />}

            {/* Amenities Section */}
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Amenities
              </label>

              {/* Amenities Description */}
              <textarea
                {...register("amenities.description", {
                  required: {
                    value: true,
                    message: "Please provide hotel amenities description.",
                  },
                })}
                placeholder="Amenities Description"
                className={`rounded-lg w-full border border-gray-300 px-2 py-2`}
              />
              {errors.amenities?.description && (
                <Validity message={errors.amenities.description.message} />
              )}

              {/*  Services checkboxes */}
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-semibold">Amenities</h3>
                <p className="mb-4 text-gray-500">Select available services:</p>
                <div className="grid grid-cols-2 pb-3 space-y-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <label
                        className="relative flex items-center cursor-pointer"
                        htmlFor={service}
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 transition-all border rounded shadow appearance-none cursor-pointer peer hover:shadow-md border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                          {...register(`amenities.services`, {
                            validate: (value) =>
                              value.length > 0 ||
                              "Please select at least one service.",
                          })}
                          id={service}
                          value={service}
                        />
                        <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="ml-3 text-sm cursor-pointer text-slate-600"
                        htmlFor={service}
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.amenities?.services && (
                  <Validity message="Please select at least one service." />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <HostField
              type="reset"
              value="Reset"
              className="!p-2 !w-fit bg-rose-500 text-white !border-none rounded-lg"
            />
            <HostField
              type="submit"
              className={`!border-none text-xl font-semibold text-white bg-gradient-to-r from-[#E51D4F] to-[#D90568] rounded-lg cursor-pointer active:scale-95 select-none`}
            />
          </div>
          <input type="hidden" {...register("hotelId")} />
        </form>
      </div>
    </>
  );
}

export default Dashboard;
