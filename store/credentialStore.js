import { create } from "zustand";

export const useOpenModalStore = create((set) => ({
  openModel: "बम बम भोले",
  setOpenModel: (model) => set({ openModel: model })
}));

export const useFormDataStore = create((set) =>({
  formData: {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    dob: "",
    image: "",
  },
  setFormData: (formData) => set({formData: formData})
}))

export const useLoginStore = create((set)=> ({
  isLogin: false,
  setIsLogin: (boolean) => set({isLogin: boolean})
}))

export const useUserStore = create((set)=>({
  user:{},
  setUser: (user)=> set({user: user})
}))

export const useNavMiddleStore = create((set)=>({
  isNavMiddle:true,
  setIsNavMiddle: (boolean) => set({isNavMiddle: boolean})
}))

export const useHasPropertyStore = create((set)=>({
  hasProperty:false,
  setHasProperty: (boolean) => set({hasProperty: boolean})
}))

export const useHostDataStore = create((set)=>({
  hostData: {
    name: "",
    location: "",
    address: "",
    city: "",
    state: "",
    country: "",
    description: "",
    image_url: [""],
    amenities: { services: [] },
    rating:"",
  },
  setHostData: (hostData)=> set({hostData:hostData})
}))

export const useRefereshRoomStore = create((set)=> ({
  reloadRooms: false,
  setReloadRooms: ()=>set(state => ({reloadRooms:!state.reloadRooms}))
}))

export const useFavoriteStore = create((set)=>({
  favorites: [],
  setFavorites: (favorites)=> set({favorites: favorites})
}))

export const useShouldFetchUserStore = create((set)=>({
  shouldFetchUser: false,
  setShouldFetchUser: ()=>set(state => ({shouldFetchUser:!state.shouldFetchUser}))
}))

export const useSearchStore = create((set)=>({
  search: false,
  searchText: "",
  setSearchText: (search)=> set({searchText: search}),
  setSearch: ()=> set(state => ({search: !state.search}))
}))

export const usePrice = create((set)=>({
  priceRange:[0,10000],
  setPriceRange: (range)=>set({priceRange: range})
}))

export const useReload = create((set)=>({
  reload: false,
  setReload: ()=> set(state=>({reload: !state.reload }))
}))

export const usePriority = create((set)=>({
  priority: "",
  setPriority: (priority)=> set({priority: priority})
}))


export const useBigSearchStore = create((set)=>({
  isBig:true,
  setIsBig: (boolean)=> set({isBig: boolean})
}))

export const useBaseURL = create((set)=>({
  baseURL: import.meta.env.VITE_BASE_URL,
  setBaseURL: (url)=> set({baseURL: url})
}))

export const useOTP = create((set)=> ({
  otp: "",
  setOtp: (otp)=> set({otp: otp})
}))