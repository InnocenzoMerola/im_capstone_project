import axios from "axios";

export const LOGIN = "login";
export const LOGOUT = "logout";
export const UPDATE_USER = "update_user";
export const UPDATE_PROFILE_IMAGE = "update_profile_img";

export const login = (userData) => ({
  type: LOGIN,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});

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

export const update_user = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateProfileImage = (imagePath) => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: imagePath,
});
