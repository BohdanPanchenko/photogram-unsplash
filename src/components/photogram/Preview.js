import "./Preview.css";
import React from "react";
const Preview = (props) => {
  const [previewExitAnimation, setPreviewExitAnimation] = React.useState(false);
  return (
    <div
      className={!previewExitAnimation ? "preview" : "preview exit"}
      onClick={(e) => {
        if (!e.target.parentElement.classList.contains("preview-img")) {
          setPreviewExitAnimation(() => true);
          setTimeout(() => {
            props.closePreview();
            setPreviewExitAnimation(() => false);
          }, 500);
        }
      }}
    >
      <div className="preview-img">
        <img src={props.src} alt="preview-img" />
      </div>
      <button type="button" className="close-btn">
        <img src="images/icons/close.png" alt="close-btn" />
      </button>
    </div>
  );
};

export default Preview;
