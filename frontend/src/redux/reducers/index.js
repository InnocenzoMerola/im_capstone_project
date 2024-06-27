import { LOGIN, LOGOUT, UPDATE_PROFILE_IMAGE, UPDATE_USER } from "../actions";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const mainReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case UPDATE_PROFILE_IMAGE:
      if (!state.user) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          profile_img: action.payload,
        },
      };

    case UPDATE_USER:
      if (!state.user) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
