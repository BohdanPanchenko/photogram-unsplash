import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchBar.css";
const API_KEY = "CxK-Wzyy1lvL4WyHG6VypCmrVvmU8iTsSyQr-dCZkws&page";
const SearchBar = () => {
  const dispatch = useDispatch();
  const defaultSearchValue = "cats";
  const [searchValue, setSearchValue] = React.useState("");

  const images = useSelector((state) => state.search.images);
  const favorites = useSelector((state) => state.favorites.favorites);

  const [activeSearchOption, setActiveSearchOption] = React.useState(
    defaultSearchValue ? defaultSearchValue : searchValue
  );
  const activeScreen = useSelector((state) => state.search.activeScreen);
  const favoritesLength = useSelector(
    (state) => state.favorites.favorites.length
  );

  const pagesNumber = useSelector((state) => state.pagination.pagesNumber);
  const firstIndexToShow = useSelector(
    (state) => state.pagination.firstIndexToShow
  );
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const queryParams = {
    search: searchValue,
    imagesCount: 30,
  };
  const searchOptions = useSelector(
    (state) => state.search.searchOptions.values
  );
  const searchPaginationInfo = useSelector(
    (state) => state.search.searchPaginationInfo
  );
  const favoritesPaginationInfo = useSelector(
    (state) => state.favorites.favoritesPaginationInfo
  );
  React.useEffect(initApp, []);
  React.useEffect(() => {
    calculatePagesNumber(activeScreen);
  }, [favorites, images]);
  function initApp() {
    fetchImages(defaultSearchValue);
    getSearchOptionsFromLocalStorage();
  }
  function clearSearchField() {
    setSearchValue(() => "");
  }

  function onSubmitHandler(searchValue) {
    if (!isEmptyString(searchValue)) {
      setActiveSearchOption(() => searchValue);
      clearSearchField();
      fetchImages(searchValue);
    }
  }

  function isEmptyString(input) {
    let isEmpty = true;
    input.split("").forEach((el) => {
      if (el !== " ") isEmpty = false;
      return isEmpty;
    });
    return isEmpty;
  }
  function resetPagination() {
    dispatch({ type: "RESET_PAGINATION" });
  }

  function returnPrevState() {
    if (activeScreen === "favorites")
      dispatch({
        type: "RETURN_PREVIOUS_STATE",
        payload: {
          pagesNumber: searchPaginationInfo.pagesNumber,
          firstIndexToShow: searchPaginationInfo.firstIndexToShow,
          currentPage: searchPaginationInfo.currentPage,
        },
      });
    else
      dispatch({
        type: "RETURN_PREVIOUS_STATE",
        payload: {
          pagesNumber: favoritesPaginationInfo.pagesNumber,
          firstIndexToShow: favoritesPaginationInfo.firstIndexToShow,
          currentPage: favoritesPaginationInfo.currentPage,
        },
      });
  }
  function rememberPreviousState() {
    const previousState = {
      pagesNumber: pagesNumber,
      firstIndexToShow: firstIndexToShow,
      currentPage: currentPage,
    };

    if (activeScreen === "search")
      dispatch({
        type: "REMEMBER_SEARCH_PREVIOUS_STATE",
        payload: { previousState: previousState },
      });
    else
      dispatch({
        type: "REMEMBER_FAVORITES_PREVIOUS_STATE",
        payload: { previousState: previousState },
      });
  }
  function addSearchOption(value) {
    if (!isEmptyString(value))
      dispatch({
        type: "ADD_SEARCH_OPTION",
        payload: { searchOption: value },
      });
  }
  function removeSearchOption(index) {
    dispatch({ type: "REMOVE_SEARCH_OPTION", payload: { index: index } });
  }
  function fetchImages(searchValue) {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=1&per_page=${queryParams.imagesCount}&orientation=landscape&query=${searchValue}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results.length !== 0) addSearchOption(searchValue);
        let newImages = res.results.map((el, index) => {
          return {
            id: el.id,
            src: el.urls.regular,
            width: el.width,
            height: el.height,
            downloadLinks: {
              small: el.urls.small,
              regular: el.urls.regular,
              full: el.urls.raw,
            },
          };
        });
        newImages = shuffleImages(newImages);
        dispatch({ type: "SET_ACTIVE_SCREEN", payload: { value: "search" } });
        dispatch({ type: "FETCH_IMAGES", payload: { newImages: newImages } });
        resetPagination();
      });
  }
  function shuffleImages(images) {
    let imagesCopy = [...images];
    let result = [];
    for (let i = 0; i < images.length; i++) {
      let randomIndex = getRandomIntInclusive(0, imagesCopy.length - 1);
      result.push(imagesCopy[randomIndex]);
      imagesCopy.splice(randomIndex, 1);
    }
    return result;
  }
  function calculatePagesNumber(activeScreen) {
    if (activeScreen === "search") {
      dispatch({
        type: "CALCULATE_PAGES_NUMBER",
        payload: {
          imagesLength: images.length,
        },
      });
    } else {
      dispatch({
        type: "CALCULATE_PAGES_NUMBER",
        payload: {
          imagesLength: favorites.length,
        },
      });
    }
  }
  function getSearchOptionsFromLocalStorage() {
    dispatch({ type: "GET_SEARCH_OPTIONS_FROM_LOCAL_STORAGE" });
  }
  function switchScreen(type, e) {
    switch (type) {
      case "imagesToFavorites":
        rememberPreviousState();
        dispatch({
          type: "SET_ACTIVE_SCREEN",
          payload: { value: "favorites" },
        });
        returnPrevState();
        calculatePagesNumber(
          activeScreen === "search" ? "favorites" : "search"
        );
        break;
      case "favoritesToImages":
        onSubmitHandler(e.target.value);
        rememberPreviousState();
        break;
      case "imagesToImages":
        if (e.target.closest(".search-value")) {
          onSubmitHandler(e.target.value);
        } else {
          onSubmitHandler(searchValue);
        }
        break;
      case "favoritesToPrevScreen":
        dispatch({
          type: "SET_ACTIVE_SCREEN",
          payload: { value: "search" },
        });
        rememberPreviousState();
        returnPrevState();

        break;
      default:
        break;
    }
  }
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return (
    <div className="search-bar">
      <div className="search-top">
        <div className="search-input">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              switchScreen("imagesToImages", e);
            }}
          >
            <input
              className="search"
              type="search"
              placeholder="Search"
              maxLength={30}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(() => e.target.value);
              }}
            ></input>
            {
              <ul className="search-options">
                {searchOptions.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        el === activeSearchOption
                          ? "search-value active"
                          : "search-value"
                      }
                    >
                      {el}
                      <input
                        type="radio"
                        id={"search-option " + index + 1}
                        name="search-option"
                        value={el}
                        checked={activeSearchOption === el ? true : false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (activeScreen === "search") {
                              switchScreen("imagesToImages", e);
                            } else if (activeScreen === "favorites") {
                              switchScreen("favoritesToImages", e);
                            }
                          }
                        }}
                      />
                      <span
                        onClick={() => {
                          removeSearchOption(index);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            }
          </form>
          <button
            className="clear-btn"
            type="button"
            onClick={() => {
              clearSearchField();
            }}
          >
            <img
              width="15px"
              src="./images/icons/close.png"
              alt="clear"
              style={{ visibility: searchValue ? "visible" : "hidden" }}
            />
          </button>
          <button
            className="search-btn"
            type="button"
            onClick={(e) => {
              switchScreen("imagesToImages", e);
            }}
          >
            <img src="./images/icons/search-icon.png" alt="search" />
          </button>
        </div>
        <button
          className={
            activeScreen === "favorites"
              ? "favorite-filter active"
              : "favorite-filter"
          }
          onClick={(e) => {
            switchScreen(
              activeScreen === "search"
                ? "imagesToFavorites"
                : "favoritesToPrevScreen",
              e
            );
          }}
        >
          <svg
            width="45"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.31804 2.31804C1.90017 2.7359 1.5687 3.23198 1.34255 3.77795C1.1164 4.32392 1 4.90909 1 5.50004C1 6.09099 1.1164 6.67616 1.34255 7.22213C1.5687 7.7681 1.90017 8.26417 2.31804 8.68204L10 16.364L17.682 8.68204C18.526 7.83812 19.0001 6.69352 19.0001 5.50004C19.0001 4.30656 18.526 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3066 1.00001 12.162 1.47412 11.318 2.31804L10 3.63604L8.68204 2.31804C8.26417 1.90017 7.7681 1.5687 7.22213 1.34255C6.67616 1.1164 6.09099 1 5.50004 1C4.90909 1 4.32392 1.1164 3.77795 1.34255C3.23198 1.5687 2.7359 1.90017 2.31804 2.31804V2.31804Z"
              stroke="#ffe4c4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{favoritesLength}</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
