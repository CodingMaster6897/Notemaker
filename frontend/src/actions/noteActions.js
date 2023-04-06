import axios from "axios";
export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "LIST_REQ" });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
    const { data } = await axios.get("/api/notes", config);
    dispatch({ type: "LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: "LIST_FAIL", payload: message });
  }
};
export const createNotes =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CREATE_REQ" });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        "Content-type": "Application/json",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category },
        config
      );
      dispatch({ type: "CREATE_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: "CREATE_FAIL", payload: message });
    }
  };
export const updateNotes =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: "UPDATE_REQ" });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        "Content-type": "Application/json",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({ type: "UPDATE_FAIL", payload: message });
    }
  };
export const deleteNotes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "DELETE_REQ",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/notes/${id}`, config);
    dispatch({
      type: "DELETE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "DELETE_FAIL",
      payload: message,
    });
  }
};
