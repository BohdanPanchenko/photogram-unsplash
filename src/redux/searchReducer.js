const initialState = {
  // images: [

  //   {
  //     id: 77,
  //     category: "Sport",
  //     src: "./images/sport/parachutes.jpg",
  //     favorite: false,
  //     tags: ["parachutes"],
  //   },
  //   {
  //     id: 78,
  //     category: "Sport",
  //     src: "./images/sport/pitch.jpg",
  //     favorite: false,
  //     tags: ["pitch", "football"],
  //   },
  //   {
  //     id: 79,
  //     category: "Sport",
  //     src: "./images/sport/skateboard.jpg",
  //     favorite: false,
  //     tags: ["skateboard", "skateboarding"],
  //   },
  //   {
  //     id: 80,
  //     category: "Sport",
  //     src: "./images/sport/skiing.jpg",
  //     favorite: false,
  //     tags: ["snow", "skiing", "winter"],
  //   },
  //   {
  //     id: 81,
  //     category: "Sport",
  //     src: "./images/sport/snowboarding.jpg",
  //     favorite: false,
  //     tags: ["snow", "snowboarding", "winter"],
  //   },
  //   {
  //     id: 82,
  //     category: "Sport",
  //     src: "./images/sport/surfer.jpg",
  //     favorite: false,
  //     tags: ["surfer", "surfing"],
  //   },
  //   {
  //     id: 84,
  //     category: "Sport",
  //     src: "./images/sport/water.jpg",
  //     favorite: false,
  //     tags: ["swimming", "water"],
  //   },
  // ],
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
    case "ADD_SEARCH_VALUE":
      let searchCount = state.searchValues.searchCount;
      if (searchCount >= 4) searchCount = 0;
      else searchCount++;

      let searchValues = [...state.searchValues.values];
      searchValues[state.searchValues.searchCount] = payload.searchValue;
      return {
        ...state,
        searchValues: {
          ...searchValues,
          values: searchValues,
          searchCount: searchCount,
        },
      };
    default:
      return state;
  }
};
export default searchReducer;
