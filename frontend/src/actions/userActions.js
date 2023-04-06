import axios from "axios";

export const login = (data) => async (dispatch) => {
  dispatch({ type: "LOGIN_SUCCESS", payload: { data } });
};
export const register = (data) => async (dispatch) => {
  dispatch({ type: "REGISTER_SUCCESS", payload: { data } });
  dispatch({ type: "LOGIN_SUCCESS", payload: { data } });
};
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "LOGOUT" });
};
export const update = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_REQ" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      "/api/users/profile",
      user,
      config
    );

    dispatch({ type: "UPDATE_SUCCESS", payload: data });

    dispatch({ type: "LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
