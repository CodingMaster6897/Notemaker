export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_REQ":
      return { loading: true };
    case "LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "REGISTER_REQ":
      return { loading: true };
    case "REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    default:
      return state;
  }
};
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_REQ":
      return { loading: true };
    case "UPDATE_SUCCESS":
      return { loading: false, userInfo: action.payload, success: true };
    case "UPDATE_FAIL":
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
