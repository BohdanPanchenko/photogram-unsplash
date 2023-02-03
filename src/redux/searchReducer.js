const initialState = {
  images: [],
  activeScreen: "search",
  searchPaginationInfo: {
    pagesNumber: 1,
    firstIndexToShow: 0,
    currentPage: 1,
  },

  searchOptions: {
    values: ["cats"],
  },
  activeSearchOption: "cats",
  isFetching: true,
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_ACTIVE_SCREEN":
      return { ...state, activeScreen: payload.value };
    case "FETCH_IMAGES":
      return {
        ...state,
        images: payload.newImages,
        isFetching: false,
        activeSearchOption: payload.activeSearchOption,
      };
    case "REMEMBER_SEARCH_PREVIOUS_STATE":
      return {
        ...state,
        searchPaginationInfo: payload.previousState,
      };
    case "GET_SEARCH_OPTIONS_FROM_LOCAL_STORAGE":
      const newSearchOptions = JSON.parse(
        localStorage.getItem("searchOptions")
      );
      if (newSearchOptions)
        return {
          ...state,
          searchOptions: {
            ...state.searchOptions,
            values: newSearchOptions,
          },
        };
      else return { ...state };
    case "ADD_SEARCH_OPTION":
      if (state.searchOptions.values.indexOf(payload.searchOption) !== -1)
        return { ...state };

      let searchOptions = [...state.searchOptions.values];
      if (searchOptions.length >= 6) {
        searchOptions.pop();
        searchOptions.unshift(payload.searchOption);
      } else searchOptions.push(payload.searchOption);
      localStorage.setItem("searchOptions", JSON.stringify(searchOptions));
      return {
        ...state,
        searchOptions: {
          ...searchOptions,
          values: searchOptions,
        },
      };
    case "REMOVE_SEARCH_OPTION":
      if (state.searchOptions.values.length === 1)
        return {
          ...state,
          images: [],
          searchOptions: { ...state.searchOptions, values: [] },
        };
      let valuesCopy = [...state.searchOptions.values];
      valuesCopy.splice(payload.index, 1);
      localStorage.setItem("searchOptions", JSON.stringify(valuesCopy));
      return {
        ...state,
        searchOptions: {
          ...state.searchOptions,
          values: valuesCopy,
          searchCount: state.searchOptions.searchCount - 1,
        },
      };
    case "SET_IS_FETCHING":
      return { ...state, isFetching: payload.isFetching };
    default:
      return state;
  }
};
export default searchReducer;
