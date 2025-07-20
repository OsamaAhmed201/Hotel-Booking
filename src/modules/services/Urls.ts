import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3000/api/v0";

export const ImageURL = "https://upskilling-egypt.com:3000/";

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

///////Admin Portal///////

export const USERS_URLS = {
  LOGIN: `/portal/users/login`,
  FORGET_PASS: `/portal/users/forgot-password`,
  REGISTER: `/portal/users`,
  CHANGE_PASS: `/portal/users/change-password`,
  RESET_PASS: `/portal/users/reset-password`,
  GET_CURRENT_USER: (id: string) => `/portal/users/${id}`,
  GET_ALL_USERS: `/admin/users`,
};

export const ROOMS_URLS = {
  ADD_ROOM:`/admin/rooms`,
  GET_ROOMS: `/admin/rooms?page=1&size=10`,
  DELETE_ROOM: (id: string) => `/admin/rooms/${id}`,
  UPDATE_ROOM: (id: string) => `/admin/rooms/${id}`,
  GET_ROOM_BY_ID:(id:string)=>`/admin/rooms/${id}`
};


export const BOOKINGS_URLS = {
  GET_BOOKINGS: `/admin/booking`,
  GET_BOOKING_DETAILS: (id: number) => `/admin/booking/${id}`,
  DELETE_BOOKING: (id: string) => `/admin/booking/${id}`,
};

export const Facilities_URL = {
  GET_facilities: `/admin/room-facilities`,
  GET_facilities_DETAILS: (id: string) => `/admin/room-facilities/${id}`,
  DELETE_facilities: (id: string) => `/admin/room-facilities/${id}`,
  ADD_facilities: `/admin/room-facilities`,
  UPDATE_FACILITIES: (id: string) => `/admin/room-facilities/${id}`
};

export const ADS_URL = {
  GET_ads: `/admin/ads`,
  GET_ads_details: (id: string) => `/admin/ads/${id}`,
  DELETE_ads: (id: string) => `/admin/ads/${id}`,
  ADD_ads: `/admin/ads`,
  UPDATE_Ads: (id: string) => `/admin/ads/${id}`
};

export const DASHBOARD_Charts_URL = {
  GET_Dash: `/admin/dashboard`,

}


///////User Portal///////

export const ROOMS_USERS_URLS = {
  GET_USERS_ROOMS: (startDate?: string | null, endDate?: string | null) => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const query = params.toString();
    return `portal/rooms/available${query ? `?${query}` : ""}`;
  },
  GET_ROOM_DETAILS: (id: string) => `portal/rooms/${id}`,
  ADD_REVIEW: `portal/room-reviews`,
  ADD_COMMENT: `portal/room-comments`,
};


export const USERS_FAVORITES = {
  GET_USER_FAVOURITES:`portal/favorite-rooms`,
  ADD_TO_FAVOURITES:`portal/favorite-rooms`,
  DELETE_FROM_FAVOURITE:(id:string)=>`portal/favorite-rooms/${id}`,
}

export const USERS_BOOKINGS ={
  GET_USERS_BOKKINGS:`portal/booking/my`,
  PAY_BOOKING:(id:string)=>`/portal/booking/${id}/pay`
}

export const comments_URL = { GET_COMMENTS:(id:string)=>`portal/room-comments/${id}`,
}



