const initialState = {
  firstIndexToShow: 0,
  pagesNumber: 1,
  currentPage: 1,
  imagesPerPage: 6,
  shouldReturnPrevState: true,
};

const paginationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CALCULATE_PAGES_NUMBER":
      const pagesNumber = Math.ceil(payload.imagesLength / state.imagesPerPage);
      if (pagesNumber === state.pagesNumber) return { ...state };
      const currentPage = pagesNumber === 1 ? 1 : state.currentPage;
      return {
        ...state,
        firstIndexToShow: pagesNumber === 1 ? 0 : state.firstIndexToShow,
        pagesNumber: pagesNumber,
        currentPage: currentPage,
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
        pagesNumber: payload.pagesNumber,
        firstIndexToShow: payload.firstIndexToShow,
        currentPage: payload.currentPage,
      };

    default:
      return state;
  }
};
export default paginationReducer;
