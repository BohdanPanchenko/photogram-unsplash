import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Photogram.css";
import Preview from "./Preview";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ImageContainer from "./ImageContainer";

const Photogram = () => {
  // const data = [
  //   {
  //     id: 2,
  //     category: "Art",
  //     src: "./images/art/starry-sky.webp",
  //     new: true,
  //     tags: ["art", "painting", "van gogh"],
  //     favorite: false,
  //   },

  //   {
  //     id: 3,
  //     category: "Art",
  //     src: "./images/art/The_Tower_of_Babel.jpg",
  //     new: true,
  //     tags: ["art", "painting", "pieter bruegel"],
  //     favorite: false,
  //   },
  //   {
  //     id: 4,
  //     category: "Art",
  //     src: "./images/art/The-Persistence-of-Memory.jpg",
  //     new: true,
  //     tags: ["art", "painting", "salvador dali"],
  //     favorite: false,
  //   },
  //   // {
  //   //   id: 4,
  //   //   category: "Art",
  //   //   src: "./images/art/joseph_wright-1.jpg",
  //   //   new: true,
  //   //   favorite: false,
  //   //   tags: [
  //   //     "sky",
  //   //     "clouds",
  //   //     "nature",
  //   //     "country",
  //   //     "cave",
  //   //     "rocks",
  //   //     "landscape",
  //   //     "rocks",
  //   //     "art",
  //   //     "painting",
  //   //   ],
  //   // },
  //   {
  //     id: 5,
  //     category: "Art",
  //     src: "./images/art/wheat-field-with-cypresses.webp",
  //     new: true,
  //     favorite: false,
  //     tags: [
  //       "sky",
  //       "clouds",
  //       "nature",
  //       "country",
  //       "cave",
  //       "rocks",
  //       "landscape",
  //       "rocks",
  //       "art",
  //       "painting",
  //     ],
  //   },
  //   {
  //     id: 6,
  //     category: "Art",
  //     src: "./images/art/van-gogh-1.webp",
  //     new: true,
  //     favorite: false,
  //     tags: ["oil", "self portrait", "art", "painting", "van gogh"],
  //   },
  //   {
  //     id: 1,
  //     category: "Art",
  //     src: "./images/art/night-cafe.webp",
  //     new: true,
  //     tags: ["art", "painting", "van gogh"],
  //     favorite: false,
  //   },
  //   {
  //     id: 7,
  //     category: "Art",
  //     src: "./images/art/harvest_straw.jpg",
  //     favorite: false,
  //     tags: ["oil", "self portrait", "art", "painting", "van gogh"],
  //   },
  //   {
  //     id: 8,
  //     category: "Animals",
  //     src: "./images/animals/cat.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats"],
  //   },
  //   {
  //     id: 9,
  //     category: "Animals",
  //     src: "./images/animals/kittens.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats", "kittens", "kitten"],
  //   },
  //   {
  //     id: 10,
  //     category: "Animals",
  //     src: "./images/animals/hedgehog.jpg",
  //     favorite: false,
  //     tags: ["hedgehog"],
  //   },
  //   {
  //     id: 11,
  //     category: "Animals",
  //     src: "./images/animals/kitten.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats", "kittens", "kitten"],
  //   },
  //   {
  //     id: 12,
  //     category: "Animals",
  //     src: "./images/animals/zebra.jpg",
  //     favorite: false,
  //     tags: ["zebra"],
  //   },
  //   {
  //     id: 13,
  //     category: "Animals",
  //     src: "./images/animals/puppies.jpg",
  //     favorite: false,
  //     tags: ["puppies", "puppy", "dog", "dogs"],
  //   },
  //   {
  //     id: 14,
  //     category: "Animals",
  //     src: "./images/animals/cat-2.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats"],
  //   },
  //   {
  //     id: 15,
  //     category: "Animals",
  //     src: "./images/animals/dolphin.jpg",
  //     favorite: false,
  //     tags: ["dolphin"],
  //   },
  //   {
  //     id: 16,
  //     category: "Animals",
  //     src: "./images/animals/owl.jpg",
  //     favorite: false,
  //     tags: ["owl"],
  //   },
  //   {
  //     id: 17,
  //     category: "Animals",
  //     src: "./images/animals/tiger.jpg",
  //     favorite: false,
  //     tags: ["tiger", "predator", "predators"],
  //   },
  //   {
  //     id: 18,
  //     category: "Animals",
  //     src: "./images/animals/tiger-2.jpg",
  //     favorite: false,
  //     tags: ["tiger", "predator", "predators"],
  //   },
  //   {
  //     id: 19,
  //     category: "Animals",
  //     src: "./images/animals/tiger-3.jpg",
  //     favorite: false,
  //     tags: ["tiger", "predator", "predators"],
  //   },
  //   {
  //     id: 20,
  //     category: "Animals",
  //     src: "./images/animals/tiger-4.jpg",
  //     favorite: false,
  //     tags: ["tiger", "predator", "predators"],
  //   },
  //   {
  //     id: 21,
  //     category: "Animals",
  //     src: "./images/animals/tigers.jpg",
  //     favorite: false,
  //     tags: ["tiger", "predator", "predators"],
  //   },
  //   {
  //     id: 22,
  //     category: "Animals",
  //     src: "./images/animals/wolf.jpg",
  //     favorite: false,
  //     tags: ["wolf", "predator", "predators"],
  //   },
  //   {
  //     id: 23,
  //     category: "Animals",
  //     src: "./images/animals/giraffe.jpg",
  //     favorite: false,
  //     tags: ["giraffe"],
  //   },
  //   {
  //     id: 24,
  //     category: "Animals",
  //     src: "./images/animals/elephant.jpg",
  //     favorite: false,
  //     tags: ["elephant"],
  //   },
  //   {
  //     id: 25,
  //     category: "Animals",
  //     src: "./images/animals/fox.jpg",
  //     favorite: false,
  //     tags: ["fox"],
  //   },
  //   {
  //     id: 26,
  //     category: "Animals",
  //     src: "./images/animals/fox-2.jpg",
  //     favorite: false,
  //     tags: ["fox"],
  //   },
  //   {
  //     id: 27,
  //     category: "Animals",
  //     src: "./images/animals/cat-3.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats"],
  //   },
  //   {
  //     id: 28,
  //     category: "Animals",
  //     src: "./images/animals/cat-5.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats"],
  //   },
  //   {
  //     id: 29,
  //     category: "Animals",
  //     src: "./images/animals/cat-6.jpg",
  //     favorite: false,
  //     tags: ["cat", "cats"],
  //   },
  //   {
  //     id: 30,
  //     category: "Animals",
  //     src: "./images/animals/whale.jpg",
  //     favorite: false,
  //     tags: ["whale", "fish"],
  //   },
  //   {
  //     id: 31,
  //     category: "Animals",
  //     src: "./images/animals/swan.jpg",
  //     favorite: false,
  //     tags: ["birds", "bird", "swan"],
  //   },
  //   {
  //     id: 32,
  //     category: "Animals",
  //     src: "./images/animals/horse.jpg",
  //     favorite: false,
  //     tags: ["horse"],
  //   },
  //   {
  //     id: 33,
  //     category: "Animals",
  //     src: "./images/animals/penguins.jpg",
  //     favorite: false,
  //     tags: ["penguins", "penguin"],
  //   },
  //   {
  //     id: 34,
  //     category: "Animals",
  //     src: "./images/animals/raccoon.jpg",
  //     favorite: false,
  //     tags: ["racoon"],
  //   },
  //   {
  //     id: 35,
  //     category: "Animals",
  //     src: "./images/animals/elephant-2.jpg",
  //     favorite: false,
  //     tags: ["elephant"],
  //   },
  //   {
  //     id: 36,
  //     category: "Food",
  //     src: "./images/food/coffee.jpg",
  //     favorite: false,
  //     tags: ["coffee", "bread"],
  //   },
  //   {
  //     id: 37,
  //     category: "Food",
  //     src: "./images/food/meat-2.jpg",
  //     favorite: false,
  //     tags: ["meat"],
  //   },
  //   {
  //     id: 38,
  //     category: "Food",
  //     src: "./images/food/oranges.jpg",
  //     favorite: false,
  //     tags: ["orange", "fruits"],
  //   },
  //   {
  //     id: 39,
  //     category: "Food",
  //     src: "./images/food/grapes.jpg",
  //     favorite: false,
  //     tags: ["grapes", "fruits"],
  //   },
  //   {
  //     id: 40,
  //     category: "Food",
  //     src: "./images/food/meat-.jpg",
  //     favorite: false,
  //     tags: ["meat"],
  //   },
  //   {
  //     id: 41,
  //     category: "Food",
  //     src: "./images/food/raspberries.jpg",
  //     favorite: false,
  //     tags: ["raspberries", "berries"],
  //   },
  //   {
  //     id: 42,
  //     category: "Food",
  //     src: "./images/food/salmon.jpg",
  //     favorite: false,
  //     tags: ["meat", "fish", "salmon"],
  //   },
  //   {
  //     id: 43,
  //     category: "Food",
  //     src: "./images/food/strawberries.jpg",
  //     favorite: false,
  //     tags: ["strawberries", "berries"],
  //   },
  //   {
  //     id: 44,
  //     category: "Food",
  //     src: "./images/food/waffles.jpg",
  //     favorite: false,
  //     tags: ["waffles", "eggs"],
  //   },
  //   {
  //     id: 45,
  //     category: "Food",
  //     src: "./images/food/apple.jpg",
  //     favorite: false,
  //     tags: ["apple", "fruits"],
  //   },
  //   {
  //     id: 46,
  //     category: "Food",
  //     src: "./images/food/blackberries.jpg",
  //     favorite: false,
  //     tags: ["blackberries", "berries"],
  //   },
  //   {
  //     id: 47,
  //     category: "Food",
  //     src: "./images/food/bread-2.jpg",
  //     favorite: false,
  //     tags: ["bread", "bakery"],
  //   },
  //   {
  //     id: 48,
  //     category: "Food",
  //     src: "./images/food/bread-3.jpg",
  //     favorite: false,
  //     tags: ["bread"],
  //   },
  //   {
  //     id: 49,
  //     category: "Food",
  //     src: "./images/food/duck.jpg",
  //     favorite: false,
  //     tags: ["duck", "meat"],
  //   },
  //   {
  //     id: 50,
  //     category: "Food",
  //     src: "./images/food/tangerines.jpg",
  //     favorite: false,
  //     tags: ["tangerines", "fruits"],
  //   },
  //   {
  //     id: 51,
  //     category: "Food",
  //     src: "./images/food/walnuts.jpg",
  //     favorite: false,
  //     tags: ["nuts"],
  //   },
  //   {
  //     id: 52,
  //     category: "Food",
  //     src: "./images/food/watermelon.jpg",
  //     favorite: false,
  //     tags: ["watermelon"],
  //   },
  //   {
  //     id: 53,
  //     category: "Food",
  //     src: "./images/food/bowl.jpg",
  //     favorite: false,
  //     tags: ["potato"],
  //   },
  //   {
  //     id: 54,
  //     category: "Nature",
  //     src: "./images/nature/autumn.jpg",
  //     favorite: false,
  //     tags: ["autumn"],
  //   },
  //   {
  //     id: 55,
  //     category: "Nature",
  //     src: "./images/nature/fall.jpg",
  //     favorite: false,
  //     tags: ["fall", "waterfall"],
  //   },
  //   {
  //     id: 56,
  //     category: "Nature",
  //     src: "./images/nature/fog.jpg",
  //     favorite: false,
  //     tags: ["fog"],
  //   },
  //   {
  //     id: 57,
  //     category: "Nature",
  //     src: "./images/nature/forest.jpg",
  //     favorite: false,
  //     tags: ["forest", "trees"],
  //   },
  //   {
  //     id: 58,
  //     category: "Nature",
  //     src: "./images/nature/forest-1.jpg",
  //     favorite: false,
  //     tags: ["forest", "trees"],
  //   },
  //   {
  //     id: 59,
  //     category: "Nature",
  //     src: "./images/nature/hills.jpg",
  //     favorite: false,
  //     tags: ["hills"],
  //   },
  //   {
  //     id: 60,
  //     category: "Nature",
  //     src: "./images/nature/niagara-falls.jpg",
  //     favorite: false,
  //     tags: ["niagara", "falls"],
  //   },
  //   {
  //     id: 61,
  //     category: "Nature",
  //     src: "./images/nature/shore.jpg",
  //     favorite: false,
  //     tags: ["shore", "beach"],
  //   },
  //   {
  //     id: 62,
  //     category: "Nature",
  //     src: "./images/nature/sky.jpg",
  //     favorite: false,
  //     tags: ["sky", "night"],
  //   },
  //   {
  //     id: 63,
  //     category: "Nature",
  //     src: "./images/nature/sky-2.jpg",
  //     favorite: false,
  //     tags: ["sky", "night"],
  //   },
  //   {
  //     id: 64,
  //     category: "Nature",
  //     src: "./images/nature/sunrise.jpg",
  //     favorite: false,
  //     tags: ["sunrise", "sun"],
  //   },
  //   {
  //     id: 65,
  //     category: "Nature",
  //     src: "./images/nature/sunset-1.jpg",
  //     favorite: false,
  //     tags: ["sunset", "sun"],
  //   },
  //   {
  //     id: 66,
  //     category: "Nature",
  //     src: "./images/nature/sunset-2.jpg",
  //     favorite: false,
  //     tags: ["sunset", "sun"],
  //   },
  //   {
  //     id: 67,
  //     category: "Nature",
  //     src: "./images/nature/winter.jpg",
  //     favorite: false,
  //     tags: ["winter", "snow"],
  //   },
  //   {
  //     id: 68,
  //     category: "Sport",
  //     src: "./images/sport/american-football.jpg",
  //     favorite: false,
  //     tags: ["football"],
  //   },
  //   {
  //     id: 69,
  //     category: "Sport",
  //     src: "./images/sport/badminton.jpg",
  //     favorite: false,
  //     tags: ["badminton"],
  //   },
  //   {
  //     id: 70,
  //     category: "Sport",
  //     src: "./images/sport/beach-volleyball.jpg",
  //     favorite: false,
  //     tags: ["volleyball"],
  //   },
  //   {
  //     id: 71,
  //     category: "Sport",
  //     src: "./images/sport/boy.jpg",
  //     favorite: false,
  //     tags: ["horse"],
  //   },
  //   {
  //     id: 72,
  //     category: "Sport",
  //     src: "./images/sport/car-racing.jpg",
  //     favorite: false,
  //     tags: ["racing", "cars"],
  //   },
  //   {
  //     id: 73,
  //     category: "Sport",
  //     src: "./images/sport/football.jpg",
  //     favorite: false,
  //     tags: ["football"],
  //   },
  //   {
  //     id: 74,
  //     category: "Sport",
  //     src: "./images/sport/golf.jpg",
  //     favorite: false,
  //     tags: ["golf"],
  //   },
  //   {
  //     id: 75,
  //     category: "Sport",
  //     src: "./images/sport/karate.jpg",
  //     favorite: false,
  //     tags: ["karate"],
  //   },
  //   {
  //     id: 76,
  //     category: "Sport",
  //     src: "./images/sport/motion.jpg",
  //     favorite: false,
  //     tags: ["bicycle"],
  //   },
  //   {
  //     id: 77,
  //     category: "Sport",
  //     src: "./images/sport/parachutes.jpg",
  //     favorite: false,
  //     tags: ["parachutes"],
  //   },
  //   {
  //     id: 78,
  //     category: "Sport",
  //     src: "./images/sport/pitch.jpg",
  //     favorite: false,
  //     tags: ["pitch", "football"],
  //   },
  //   {
  //     id: 79,
  //     category: "Sport",
  //     src: "./images/sport/skateboard.jpg",
  //     favorite: false,
  //     tags: ["skateboard", "skateboarding"],
  //   },
  //   {
  //     id: 80,
  //     category: "Sport",
  //     src: "./images/sport/skiing.jpg",
  //     favorite: false,
  //     tags: ["snow", "skiing", "winter"],
  //   },
  //   {
  //     id: 81,
  //     category: "Sport",
  //     src: "./images/sport/snowboarding.jpg",
  //     favorite: false,
  //     tags: ["snow", "snowboarding", "winter"],
  //   },
  //   {
  //     id: 82,
  //     category: "Sport",
  //     src: "./images/sport/surfer.jpg",
  //     favorite: false,
  //     tags: ["surfer", "surfing"],
  //   },
  //   {
  //     id: 84,
  //     category: "Sport",
  //     src: "./images/sport/water.jpg",
  //     favorite: false,
  //     tags: ["swimming", "water"],
  //   },
  // ];
  const dispatch = useDispatch();
  const imagesLength = useSelector((state) => state.search.images.length);
  const favoritesLength = useSelector(
    (state) => state.favorites.favorites.length
  );
  const searchActive = useSelector((state) => state.search.searchActive);

  const [imagesToShowLength, setImagesToShowLength] = React.useState(0);

  const [firstIndexToShow, setFirstIndexToShow] = React.useState(0);
  const [pagesNumber, setPagesNumber] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [favoritesActive, setFavoritesActive] = React.useState(false);

  const [categoryBuffer, setCategoryBuffer] = React.useState([]); //pagesNumber,  currentPage,   firstIndexToShow:

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

  // function backToCategories() {
  //   // if (categoryBuffer.length > 0) {
  //   //   setPagesNumber(() => categoryBuffer[0]);
  //   //   setCurrentPage(() => categoryBuffer[1]);
  //   //   setFirstIndexToShow(() => categoryBuffer[2]);
  //   //   setCategoryBuffer(() => []);
  //   //   setFilteredImages(() =>
  //   //     images.filter((el) => el.category === selectedCategory)
  //   //   );
  //   //   setFavoritesActive(() => false);
  //   //   setSearchActive(() => false);
  //   // }
  // }
  function calculatePagesNumber(favoritesActive) {
    if (!favoritesActive) {
      dispatch({
        type: "CALCULATE_PAGES_NUMBER",
        payload: {
          imagesLength: imagesLength,
        },
      });
    } else {
      dispatch({
        type: "CALCULATE_PAGES_NUMBER",
        payload: {
          imagesLength: favoritesLength,
        },
      });
    }
  }
  return (
    <div className="wrapper">
      {previewImage !== "" && (
        <Preview
          src={previewImage}
          // exitAnimation={previewExitAnimation}
          closePreview={closePreview}
        />
      )}
      <SearchBar
        // selectCategory={selectCategory}
        // showFavorites={showFavorites}
        // favoritesLength={favoritesLength}
        // searchByKeywords={searchByKeywords}
        // backToCategories={backToCategories}
        // favoritesActive={favoritesActive}
        calculatePagesNumber={calculatePagesNumber}
      />
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
      {/* <ImageList cols={3} rowHeight={260}>
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
              <img
                alt={el.category}
                src={el.src}
                style={{}}
                onClick={() => {
                  openPreview(el.id);
                }}
              />
              <button
                className={el.favorite ? "favorite added" : "favorite"}
                type="button"
                onClick={() => {
                  addToFavorites(el.id);
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
      </ImageList> */}
      <ImageContainer
        openPreview={openPreview}
        getImagesToShowLength={getImagesToShowLength}
      />
      <Pagination />
    </div>
  );
};
export default Photogram;
