export const noteListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case "LIST_REQ":
      return { loading: true };
    case "LIST_SUCCESS":
      return { loading: false, notes: action.payload };
    case "LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_REQ":
      return { loading: true };
    case "CREATE_SUCCESS":
      return { loading: false, success: true };
    case "CREATE_FAIL":
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_REQ":
      return { loading: true };
    case "DELETE_SUCCESS":
      return { loading: false, success: true };
    case "DELETE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_REQ":
      return { loading: true };
    case "UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_FAIL":
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
