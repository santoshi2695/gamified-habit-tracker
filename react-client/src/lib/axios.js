import axios from "axios";

// axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URI}/api`,
  // withCredentials: true,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getAuthToken() {
  const tokenName = "hanko";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(tokenName + "=") === 0) {
      return cookie.substring(tokenName.length + 1, cookie.length);
    }
  }
  return null;
}
