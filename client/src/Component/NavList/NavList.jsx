import React, { useContext, useRef, useState } from "react";
import { CustomContext } from "../../utils/Context/Context";
import { useLocation } from "react-router-dom";
import axios from "../../utils/Axios/Axios";

const NavList = () => {
  const {
    setCategory,
    category,
    navigate,
    setPages,
    setActiveItem,
    activeItem,
    setProducts,
  } = useContext(CustomContext);

  const [listOpen, setListOpen] = useState(false);
  const listRef = useRef(null);
  const { pathname } = useLocation();

  const getCategory = async (event) => {
    if (event.target.localName === "li") {
      const newCategory = event.target.textContent;
      setCategory(newCategory === "Акция" ? "" : newCategory);

      const res = await axios.get(
        `api/products/get?category=${
          newCategory === "Акция" ? "" : newCategory
        }&limit=6`
      );
     
      setProducts(res.data);
      pathname === "/catalog" ? null : navigate("/catalog");
      setPages(1);

      setActiveItem(newCategory);
    }
  };

  window.addEventListener("click", (e) => {
    if (listOpen && e.target !== listRef.current) {
      setListOpen(false);
    }
  });

  return (
    <div className="nav">
      <ul
        id="navList"
        className={`nav-list ${listOpen && "nav-list-active"} `}
        onClick={getCategory}
      >
        <li
          className={`nav-list-kitchen ${
            pathname === "/catalog" && activeItem === "Кухни" ? "active" : ""
          }`}
        >
          Кухни
        </li>
        <li
          className={`nav-list-bedroom ${
            pathname === "/catalog" && activeItem === "Спальни" ? "active" : ""
          }`}
        >
          Спальни
        </li>
        <li
          className={`nav-list-livingRoom ${
            pathname === "/catalog" && activeItem === "Гостиные" ? "active" : ""
          }`}
        >
          Гостиные
        </li>
        <li
          className={`nav-list-hallway ${
            pathname === "/catalog" && activeItem === "Прихожие" ? "active" : ""
          }`}
        >
          Прихожие
        </li>
        <li
          className={`nav-list-office ${
            pathname === "/catalog" && activeItem === "Офисная мебель"
              ? "active"
              : ""
          }`}
        >
          Офисная мебель
        </li>
        <li
          className={`nav-list-childrensRoom ${
            pathname === "/catalog" && activeItem === "Детские" ? "active" : ""
          }`}
        >
          Детские
        </li>
        <li
          className={`nav-list-sale ${
            pathname === "/catalog" && activeItem === "Акция" ? "active" : ""
          }`}
        >
          Акция
        </li>

        {listOpen ? (
          <button
            className="nav-list__btn list-closed"
            type="button"
            onClick={() => {
              setListOpen((prev) => !prev);
            }}
            ref={listRef}
          ></button>
        ) : (
          <button
            className="nav-list__btn list-open"
            type="button"
            onClick={() => {
              setListOpen((prev) => !prev);
            }}
            ref={listRef}
          ></button>
        )}

        <span></span>
      </ul>
    </div>
  );
};

export default NavList;
