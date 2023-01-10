import React from "react";

import "./Photogram.css";
import Preview from "./Preview";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ImageContainer from "./ImageContainer";

const Photogram = () => {
  const [imagesToShowLength, setImagesToShowLength] = React.useState(0);
  const [previewImage, setPreviewImage] = React.useState("");

  function openPreview(src) {
    setPreviewImage(() => src);
  }
  function closePreview(e) {
    setPreviewImage(() => "");
  }
  function getImagesToShowLength(length) {
    setImagesToShowLength(() => length);
  }

  return (
    <div className="wrapper">
      {previewImage !== "" && (
        <Preview src={previewImage} closePreview={closePreview} />
      )}
      <SearchBar />
      <div
        className="placeholder"
        style={{ display: !imagesToShowLength ? "" : "none" }}
      >
        <img
          className="placeholder-image"
          src="./images/icons/no-results.png"
          alt="no results"
        />
        <h3 className="placeholder-text">There's no images found!</h3>
      </div>
      <ImageContainer
        openPreview={openPreview}
        getImagesToShowLength={getImagesToShowLength}
      />
      <Pagination />
    </div>
  );
};
export default Photogram;
