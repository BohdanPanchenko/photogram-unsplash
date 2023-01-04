import "./Pagination.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const Pagination = (props) => {
  const dispatch = useDispatch();
  const [pages, setPages] = React.useState([]);
  const imagesLength = useSelector((state) => state.search.images.length);
  const pagesNumber = useSelector((state) => state.pagination.pagesNumber);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const firstIndexToShow = useSelector(
    (state) => state.pagination.firstIndexToShow
  );
  React.useEffect(calculatePagesNumber, [imagesLength]);
  React.useEffect(createPaginationArray, [pagesNumber]);
  // React.useEffect(calculatePagesNumber, [firstIndexToShow]);
  function calculatePagesNumber() {
    dispatch({
      type: "CALCULATE_PAGES_NUMBER",
      payload: {
        imagesLength: imagesLength,
      },
    });
  }
  function createPaginationArray() {
    let pages = [];
    for (let i = 0; i < pagesNumber; i++) {
      pages.push(i + 1);
    }
    setPages(() => pages);
  }
  function getToTheNextPage() {
    dispatch({ type: "GET_TO_THE_NEXT_PAGE" });
  }
  function getToThePreviousPage() {
    dispatch({ type: "GET_TO_THE_PREVIOUS_PAGE" });
  }
  function switchPage(e) {
    dispatch({
      type: "SWITCH_PAGE",
      payload: {
        page: Number(e.target.value),
      },
    });
  }
  return (
    <div className="pagination">
      <button
        className={firstIndexToShow === 0 ? "prev-btn disabled" : "prev-btn"}
        style={{ visibility: pagesNumber <= 1 ? "hidden" : "" }}
        type="button"
        onClick={getToThePreviousPage}
      >
        <img src="./images/icons/arrow-icon.svg" alt="prev-arrow" />
      </button>
      <div className="pages">
        {pages.map((el, index) => {
          return (
            <button
              key={index}
              type="button"
              value={el}
              className={el === currentPage ? "active" : ""}
              onClick={switchPage}
              style={{ visibility: pagesNumber <= 1 ? "hidden" : "" }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={
          currentPage === pagesNumber ? "next-btn disabled" : "next-btn"
        }
        onClick={getToTheNextPage}
        style={{ visibility: pagesNumber <= 1 ? "hidden" : "" }}
      >
        <img src="./images/icons/arrow-icon.svg" alt="next-arrow" />
      </button>
    </div>
  );
};

export default Pagination;
