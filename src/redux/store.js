import { createStore, combineReducers, applyMiddleware } from "redux";
import paginationReducer from "./paginationReducer";
import searchReducer from "./searchReducer";
import favoritesReducer from "./favoritesReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  search: searchReducer,
  pagination: paginationReducer,
  favorites: favoritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
