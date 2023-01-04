import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
const ImageContainer = (props) => {
  const dispatch = useDispatch();
  const imagesPerPage = 6;
  const imagePlaceholderURL = "./images/placeholder-image.jpg";
  const firstIndexToShow = useSelector(
    (state) => state.pagination.firstIndexToShow
  );
  const currentPage = useSelector((state) => state.pagination.currentPage);

  const images = useSelector((state) => state.search.images);
  const favorites = useSelector((state) => state.favorites.favorites);
  const favoritesActive = useSelector(
    (state) => state.favorites.favoritesActive
  );

  const favoritesPaginationInfo = useSelector(
    (state) => state.favorites.favoritesPaginationInfo
  );
  const searchPaginationInfo = useSelector(
    (state) => state.search.searchPaginationInfo
  );
  // const searchActive = useSelector((state) => state.search.searchActive);
  const [imagesToShow, setImagesToShow] = React.useState([]);

  React.useEffect(getFavoritesFromLocalStorage, []);
  React.useEffect(saveFavoritesToLocalStorage, [favorites]);
  React.useEffect(fillImagesToShow, [
    images,
    firstIndexToShow,
    favoritesActive,
    favorites,
  ]);
  React.useEffect(() => {
    props.getImagesToShowLength(imagesToShow.length);
  }, [imagesToShow]);
  React.useEffect(() => {
    // resetPagination();
    returnPreviousState();
    // calculatePagesNumber();
  }, [favoritesActive]);
  function addPlaceholders() {
    if (!imagesToShow.length) {
      let arr = new Array(imagesPerPage);
      arr.fill("");
      arr = arr.map((el, index) => {
        return { id: index, src: imagePlaceholderURL };
      });
      setImagesToShow(() => arr);
    }
  }
  function fillImagesToShow() {
    // if (!images.length && !favoritesActive) return;
    if (!favoritesActive) {
      setImagesToShow(() =>
        images.filter(
          (el, index) =>
            index >= firstIndexToShow &&
            index < firstIndexToShow + imagesPerPage
        )
      );
    } else {
      setImagesToShow(() =>
        favorites.filter(
          (el, index) =>
            index >= firstIndexToShow &&
            index < firstIndexToShow + imagesPerPage
        )
      );
    }
  }
  function calculatePagesNumber(favoritesActive) {
    if (!favoritesActive) {
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
  function resetPagination() {
    dispatch({ type: "RESET_PAGINATION" });
  }
  function returnPreviousState() {
    if (favoritesActive) {
      dispatch({
        type: "RETURN_PREVIOUS_STATE",
        payload: favoritesPaginationInfo,
      });
    } else {
      dispatch({
        type: "RETURN_PREVIOUS_STATE",
        payload: searchPaginationInfo,
      });
    }
  }
  function toggleFavorite(id, src) {
    if (favorites.findIndex((el) => el.id === id) === -1) {
      dispatch({
        type: "ADD_TO_FAVORITES",
        payload: {
          id: id,
          src: src,
        },
      });
    } else {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: { id: id } });
    }
  }
  function isFavorite(id) {
    if (favorites.findIndex((el) => el.id === id) !== -1) return true;
    else return false;
  }
  function saveFavoritesToLocalStorage() {
    dispatch({ type: "SAVE_FAVORITES_TO_LOCAL_STORAGE" });
  }
  function getFavoritesFromLocalStorage() {
    dispatch({ type: "GET_FAVORITES_FROM_LOCAL_STORAGE" });
  }
  return (
    <>
      <ImageList cols={3} rowHeight={260}>
        {imagesToShow.map((el, index) => {
          return (
            <ImageListItem
              style={{
                borderRadius: "15px",
                overflow: "hidden",
              }}
              key={el.id}
              cols={1}
            >
              (
              <img
                alt="img"
                src={el.src}
                style={
                  el.src === imagePlaceholderURL
                    ? {
                        objectPosition: "0 -15px",
                        opacity: "0.7",
                      }
                    : null
                }
                onClick={() => {
                  props.openPreview(el.src);
                }}
              />
              )
              <button
                className={isFavorite(el.id) ? "favorite added" : "favorite"}
                type="button"
                style={
                  el.src === imagePlaceholderURL ? { display: "none" } : null
                }
                onClick={() => {
                  toggleFavorite(el.id, el.src);
                }}
              >
                <svg
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
              </button>
            </ImageListItem>
          );
        })}
      </ImageList>
    </>
  );
};

export default ImageContainer;
