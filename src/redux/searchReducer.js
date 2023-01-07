const initialState = {
  images: [],
  searchActive: true,
  searchPaginationInfo: {
    pagesNumber: 1,
    firstIndexToShow: 0,
    currentPage: 1,
  },
  searchValues: {
    values: [],
    searchCount: 0,
  },
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SEARCH_ACTIVE":
      console.log("searchActive:", payload.value);
      return { ...state, searchActive: payload.value };
    case "FETCH_IMAGES":
      return { ...state, images: payload.newImages };
    case "REMEMBER_SEARCH_PREVIOUS_STATE":
      return {
        ...state,
        searchPaginationInfo: payload.previousState,
      };
    case "GET_SEARCH_VALUES_FROM_LOCAL_STORAGE":
      const newSearchValues = JSON.parse(localStorage.getItem("searchValues"));
      if (newSearchValues)
        return {
          ...state,
          searchValues: {
            ...state.searchValues,
            values: newSearchValues,
            searchCount: newSearchValues.length,
          },
        };
      else return { ...state };
    case "ADD_SEARCH_VALUE":
      if (state.searchValues.values.indexOf(payload.searchValue) !== -1)
        return { ...state };
      let searchCount = state.searchValues.searchCount;
      if (searchCount >= 6) searchCount = 0;
      else searchCount++;

      let searchValues = [...state.searchValues.values];
      searchValues[state.searchValues.searchCount] = payload.searchValue;

      localStorage.setItem("searchValues", JSON.stringify(searchValues));
      return {
        ...state,
        searchValues: {
          ...searchValues,
          values: searchValues,
          searchCount: searchCount,
        },
      };
    case "REMOVE_SEARCH_VALUE":
      let valuesCopy = [...state.searchValues.values];
      valuesCopy.splice(payload.index, 1);
      localStorage.setItem("searchValues", JSON.stringify(valuesCopy));
      return {
        ...state,
        searchValues: {
          ...state.searchValues,
          values: valuesCopy,
          searchCount: state.searchValues.searchCount - 1,
        },
      };
    default:
      return state;
  }
};
export default searchReducer;
