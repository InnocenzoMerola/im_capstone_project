import axios from "axios";

export const LOGIN = "login";
export const LOGOUT = "logout";

export const updateProfile = (data, token) => {
  return axios.post("/api/v1/profile/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePassword = (data, token) => {
  return axios.post("/api/v1/profile/update-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadImage = (data, token) => {
  return axios.post("/api/v1/profile/upload-image", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
