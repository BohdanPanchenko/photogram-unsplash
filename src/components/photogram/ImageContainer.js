import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAs } from "file-saver";
const ImageContainer = (props) => {
  const dispatch = useDispatch();
  const imagesPerPage = 6;
  const heightToWidth = 0.65;
  const imagePlaceholderURL = "./images/placeholder-image.jpg";
  const imageListElement = React.useRef(null);
  const [downloadBoxExitAnimation, setDownloadBoxExitAnimation] =
    React.useState(false);
  const firstIndexToShow = useSelector(
    (state) => state.pagination.firstIndexToShow
  );
  const [downloadLinks, setDownloadLinks] = React.useState("");
  const images = useSelector((state) => state.search.images);
  const favorites = useSelector((state) => state.favorites.favorites);

  const activeScreen = useSelector((state) => state.search.activeScreen);

  const [imagesToShow, setImagesToShow] = React.useState([]);

  React.useEffect(getFavoritesFromLocalStorage, []);
  React.useEffect(saveFavoritesToLocalStorage, [favorites]);
  React.useEffect(() => {
    fillImagesToShow();
  }, [images, firstIndexToShow, activeScreen, favorites]);
  React.useEffect(() => {
    props.getImagesToShowLength(imagesToShow.length);
  }, [imagesToShow]);
 React.useEffect(scrollToTheTop, [firstIndexToShow]);
  function scrollToTheTop() {
    imageListElement.current.scrollTop = 0;
  }
  function fillImagesToShow() {
    // if (!images.length && !favoritesActive) return;
    if (activeScreen === "search") {
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
  function closeDownloadBox() {
    setDownloadBoxExitAnimation(() => true);
    setTimeout(() => {
      setDownloadBoxExitAnimation(() => false);
      setDownloadLinks(() => "");
    }, 1000);
  }

  function toggleFavorite(image) {
    if (favorites.findIndex((el) => el.id === image.id) === -1) {
      dispatch({
        type: "ADD_TO_FAVORITES",
        payload: {
          id: image.id,
          src: image.src,
          small: image.downloadLinks.small,
          regular: image.downloadLinks.regular,
          full: image.downloadLinks.full,
          width: image.width,
          height: image.height,
        },
      });
    } else {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: { id: image.id } });
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
  function downloadImage(el, size) {
    saveAs(el.downloadLinks[size], `${el.id}/size=${size}.jpg`);
  }
  return (
    <>
      <ul className="images-list" ref={imageListElement}>
        {imagesToShow.map((el, index) => {
          return (
            <li
              className="image-item"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
              }}
              key={el.id}
            >
              <img
                alt="photogram-item"
                src={el.src}
                style={{
                  height:
                    el.height / el.width < heightToWidth ? "100%" : "auto",
                  width: el.height / el.width < heightToWidth ? "auto" : "100%",
                }}
                onClick={() => {
                  props.openPreview(el.src);
                }}
              />
              <div className="image-actions">
                <button
                  className={isFavorite(el.id) ? "favorite added" : "favorite"}
                  type="button"
                  style={
                    el.src === imagePlaceholderURL ? { display: "none" } : null
                  }
                  onClick={() => {
                    toggleFavorite(el);
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
                <button
                  className="download-btn"
                  onClick={() => {
                    setDownloadLinks(() => el.id);
                  }}
                >
                  <img alt="download-icon" src="./images/icons/download.png" />
                </button>
              </div>
              {downloadLinks === el.id && (
                <ul
                  className={
                    downloadBoxExitAnimation
                      ? "download-links exit"
                      : "download-links"
                  }
                >
                  <li className="download-close">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeDownloadBox}
                    />
                  </li>
                  <li
                    className="download-link"
                    onClick={() => {
                      downloadImage(el, "small");
                      closeDownloadBox();
                    }}
                  >
                    Small
                  </li>
                  <li
                    className="download-link"
                    onClick={() => {
                      downloadImage(el, "regular");
                      closeDownloadBox();
                    }}
                  >
                    Regular
                  </li>
                  <li
                    className="download-link"
                    onClick={() => {
                      downloadImage(el, "full");
                      closeDownloadBox();
                    }}
                  >
                    Full
                  </li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImageContainer;
