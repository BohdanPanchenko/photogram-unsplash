const initialState = {
  favorites: [],
  favoritesActive: false,
  favoritesPaginationInfo: {
    pagesNumber: 1,
    firstIndexToShow: 0,
    currentPage: 1,
  },
};

const favoritesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_FAVORITES_FROM_LOCAL_STORAGE":
      let favorites = localStorage.getItem("favorites");
      if (favorites) {
        return { ...state, favorites: JSON.parse(favorites) };
      }
      return state;
    case "SAVE_FAVORITES_TO_LOCAL_STORAGE":
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      return state;
    case "SET_FAVORITES_ACTIVE":
      console.log("favoritesActive:", !state.favoritesActive);
      return { ...state, favoritesActive: !state.favoritesActive };
    case "ADD_TO_FAVORITES":
      const favoriteImg = {
        id: payload.id,
        src: payload.src,
      };
      return { ...state, favorites: [...state.favorites, favoriteImg] };
    case "REMOVE_FROM_FAVORITES":
      const indexToRemove = state.favorites.findIndex(
        (el) => el.id === payload.id
      );
      let newFavorites = [...state.favorites];
      newFavorites.splice(indexToRemove, 1);
      return { ...state, favorites: newFavorites };
    case "REMEMBER_FAVORITES_PREVIOUS_STATE":
      return {
        ...state,
        favoritesPaginationInfo: payload.previousState,
      };
    default:
      return state;
  }
};
export default favoritesReducer;
