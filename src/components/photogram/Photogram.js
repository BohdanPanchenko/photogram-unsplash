import React from "react";
import { useSelector } from "react-redux";

import "./Photogram.css";
import Preview from "./Preview";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ImageContainer from "./ImageContainer";
import Preloader from "./Preloader";

const Photogram = () => {
  const imagesLength = useSelector((state) => state.search.images.length);
  const favoritesLength = useSelector(
    (state) => state.favorites.favorites.length
  );
  const activeScreen = useSelector((state) => state.search.activeScreen);
  const isFetching = useSelector((state) => state.search.isFetching);
  const placeholderIsShown =
    (!imagesLength && !isFetching) ||
    (!favoritesLength && activeScreen !== "search");
  const [previewImage, setPreviewImage] = React.useState("");

  function openPreview(src) {
    setPreviewImage(() => src);
  }
  function closePreview(e) {
    setPreviewImage(() => "");
  }

  return (
    <div className="wrapper">
      {previewImage !== "" && (
        <Preview src={previewImage} closePreview={closePreview} />
      )}
      <SearchBar />

      <div
        className="placeholder"
        style={{
          display: placeholderIsShown ? "" : "none",
        }}
      >
        <img
          className="placeholder-image"
          src="./images/icons/no-results.png"
          alt="no results"
        />
        <h3 className="placeholder-text">There's no images found!</h3>
      </div>
      {isFetching ? (
        <Preloader />
      ) : (
        <ImageContainer openPreview={openPreview} />
      )}

      <Pagination />
    </div>
  );
};
export default Photogram;
