const initialState = {
  firstIndexToShow: 0,
  pagesNumber: 1,
  currentPage: 1,
  imagesPerPage: 6,
};

const paginationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CALCULATE_PAGES_NUMBER":
      return {
        ...state,
        pagesNumber: Math.ceil(payload.imagesLength / state.imagesPerPage),
      };
    case "GET_TO_THE_NEXT_PAGE":
      return {
        ...state,
        currentPage: state.currentPage + 1,
        firstIndexToShow: state.firstIndexToShow + state.imagesPerPage,
      };
    case "GET_TO_THE_PREVIOUS_PAGE":
      return {
        ...state,
        currentPage: state.currentPage - 1,
        firstIndexToShow: state.firstIndexToShow - state.imagesPerPage,
      };
    case "SWITCH_PAGE":
      return {
        ...state,
        currentPage: payload.page,
        firstIndexToShow:
          payload.page * state.imagesPerPage - state.imagesPerPage,
      };
    case "RESET_PAGINATION":
      return {
        ...state,
        currentPage: 1,
        firstIndexToShow: 0,
      };
    case "RETURN_PREVIOUS_STATE":
      return {
        ...state,
        firstIndexToShow: payload.firstIndexToShow,
        currentPage: payload.currentPage,
      };
    default:
      return state;
  }
};
export default paginationReducer;
