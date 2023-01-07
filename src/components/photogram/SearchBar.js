// import { unstable_createChainedFunction } from "@mui/utils";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchBar.css";
const API_KEY = "CxK-Wzyy1lvL4WyHG6VypCmrVvmU8iTsSyQr-dCZkws&page";
const SearchBar = (props) => {
  const dispatch = useDispatch();
  // const categories = [

  //   { name: "Animals", src: "./images/categories/animals.jpg" },
  //   { name: "Food", src: "./images/categories/food.jpg" },
  //   { name: "Sport", src: "./images/categories/sport.jpg" },
  //   { name: "Art", src: "./images/categories/art.jpg" },
  //   { name: "Nature", src: "./images/categories/nature.jpg" },
  // ];
  const defaultSearchValue = useSelector(
    (state) => state.search.searchValues.values[0]
  );
  const [searchValue, setSearchValue] = React.useState(
    defaultSearchValue ? defaultSearchValue : ""
  );
  // const [searchPrevValue, setSearchPrevValue] = React.useState("");
  const searchActive = useSelector((state) => state.search.searchActive);
  const [searchValueNumber, setSearchValueNumber] = React.useState(0);
  const [submitTrigger, setSubmitTrigger] = React.useState(false);
  const favoritesActive = useSelector(
    (state) => state.favorites.favoritesActive
  );
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
  const searchValues = useSelector((state) => state.search.searchValues.values);

  React.useEffect(() => {
    // fetchImages();
    getSearchValuesFromLocalStorage();
  }, []);
  React.useEffect(onSubmitHandler, [submitTrigger]);
  function clearSearchField() {
    setSearchValue(() => "");
  }
  function setSearchActive(value) {
    dispatch({
      type: "SET_SEARCH_ACTIVE",
      payload: {
        value: value,
      },
    });
    props.calculatePagesNumber(value);
  }
  function setFavoritesActive() {
    dispatch({
      type: "SET_FAVORITES_ACTIVE",
    });
    props.calculatePagesNumber(favoritesActive);
  }
  function onSubmitHandler() {
    if (!isEmptyString(searchValue) && !valueAlreadyExists(searchValue)) {
      addSearchValue();
      // setSearchPrevValue(() => searchValue);
      setSearchValueNumber(() => searchValues.length);
      console.log(searchValues.indexOf(searchValue));
      fetchImages();
      setSearchActive(true);
      rememberPreviousState(searchActive);
      resetPagination();
      // props.calculatePagesNumber();
      if (favoritesActive) setFavoritesActive();
    }
  }
  function valueAlreadyExists(value) {
    let exists = false;
    searchValues.forEach((el) => {
      if (el === value) return true;

      return exists;
    });
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
  function toggleFavorites() {
    rememberPreviousState(searchActive);
    if (!favoritesActive) {
      setFavoritesActive();
      setSearchActive(false);
      resetPagination();
      props.calculatePagesNumber(true);
    } else {
      setFavoritesActive();
      setSearchActive(true);
      props.calculatePagesNumber(false);
    }
  }
  function rememberPreviousState(searchActive) {
    const previousState = {
      pagesNumber: pagesNumber,
      firstIndexToShow: firstIndexToShow,
      currentPage: currentPage,
    };
    if (searchActive) {
      dispatch({
        type: "REMEMBER_SEARCH_PREVIOUS_STATE",
        payload: { previousState: previousState },
      });
    } else {
      dispatch({
        type: "REMEMBER_FAVORITES_PREVIOUS_STATE",
        payload: { previousState: previousState },
      });
    }
  }
  function addSearchValue() {
    dispatch({
      type: "ADD_SEARCH_VALUE",
      payload: { searchValue: searchValue },
    });
  }
  function removeSearchValue(index) {
    dispatch({ type: "REMOVE_SEARCH_VALUE", payload: { index: index } });
  }
  function setSearchQuery(value) {
    //submitTrigger
    setSearchValue(() => value);
    setSearchActive(() => true);
    if (favoritesActive) setFavoritesActive();
    dispatch({
      type: "SET_SHOULD_RETURN_PREV_STATE",
      payload: { value: false },
    });
    // resetPagination();
    setSubmitTrigger((prev) => !prev);
  }
  function fetchImages() {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=1&per_page=${queryParams.imagesCount}&orientation=landscape&query=${queryParams.search}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        let newImages = res.results.map((el, index) => {
          return {
            id: el.id,
            src: el.urls.regular,
            width: el.width,
            height: el.height,
          };
        });
        newImages = shuffleImages(newImages);
        dispatch({ type: "FETCH_IMAGES", payload: { newImages: newImages } });
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
  function getSearchValuesFromLocalStorage() {
    dispatch({ type: "GET_SEARCH_VALUES_FROM_LOCAL_STORAGE" });
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
              onSubmitHandler();
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

              // onBlur={() => {
              //   setTimeout(() => {
              //     setSearchFocused(() => false);
              //   }, 100);
              // }}
            ></input>
            {
              <ul className="search-values">
                {searchValues.map((el, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        searchValueNumber === index
                          ? "search-value active"
                          : "search-value"
                      }
                      onClick={(e) => {
                        if (e.target.className === "search-value") {
                          setSearchValueNumber(() => index);
                          setSearchQuery(el);
                        }
                      }}
                    >
                      {el}
                      <span
                        onClick={() => {
                          removeSearchValue(index);
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
              // console.log(searchActive);
              // if (searchActive) {
              //   setSearchActive(false);
              // }
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
            onClick={onSubmitHandler}
          >
            <img src="./images/icons/search-icon.png" alt="search" />
          </button>
        </div>
        <button
          className={
            favoritesActive ? "favorite-filter active" : "favorite-filter"
          }
          onClick={toggleFavorites}
        >
          <svg
            width="45"
            // height="18"
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
      {/* <div className="search-bottom">
        <ul className="search-categories">
          {categories.map((el, index) => {
            return (
              <li key={index} className="categories-item">
                <button
                  className={el.name === selectedCategory ? "selected" : ""}
                  type="button"
                  value={el.name}
                  onClick={(e) => {
                    setSelectedCategory(() => e.target.value);
                    props.selectCategory(e.target.value);
                    setFavoritesActive(() => false);
                  }}
                >
                  <img src={el.src} alt={el.name} />
                </button>
                <h3 className="categories-title">{el.name}</h3>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default SearchBar;
