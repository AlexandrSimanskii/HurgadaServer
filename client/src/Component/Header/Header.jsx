import { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomContext } from "../../utils/Context/Context";
import NavList from "../NavList/NavList";
import axios from "../../utils/Axios/Axios";

const Header = () => {
  const {
    
    logOutUser,
    user,
    navigate,
    search,
    setSearch,
    location,
    setProducts,
   
  } = useContext(CustomContext);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    location.pathname !== "/catalog" && setSearch("");
  }, [location.pathname]);

  const handleSearch = async (e) => {
    location.pathname !== "/catalog" && navigate("/catalog"),
      setSearch(e.target.value);
    const res = await axios.get(
      `api/products/get?searchTerm=${e.target.value}`
    );
    setProducts(res.data);
  };

  document.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== menuBtnRef.current) {
      setIsOpen(false);
    }
  });

  return (
    <div className="header">
      <div
        className={`header__top ${isOpen && "header__top-visible"}`}
        ref={menuRef}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className="container">
          <div className="header__top-wrapper">
            <div className="header__top-left">
              <ul className="header__list">
                <li>
                  <Link to={"/"}>Главная</Link>
                </li>
                <li>
                  <Link to={"about"}>О нас</Link>
                </li>
                <li>
                  <Link to={"room"}>Личный кабинет</Link>
                </li>
              </ul>
            </div>
            <div className="header__top-right">
              <ul className="header__list">
                <li>
                  <img src="/images/icons/phone.svg" alt="" />
                  <a className="header__list-phone" href="tel:89648999119">
                    8 (964) 89 99 119
                  </a>
                </li>
                <li>
                  <Link to={"/about"}>
                    <img
                      className="img"
                      src="/images/icons/delivery-icon.svg"
                      alt=""
                    />
                    <p className="header__list-deliver" href="#">
                      Доставка
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="header__main">
          <button className="header__main-btn">
            <img
              onClick={() => setIsOpen(true)}
              ref={menuBtnRef}
              src="/images/icons/menu-icon.svg"
              alt="menu"
            />
          </button>
          <Link to={"/"}>
            <img
              className="header__main_logo"
              src="/images/image/LOGO.svg"
              alt="logo"
            />
          </Link>
          <div className="header-search">
            <input
              onChange={handleSearch}
              placeholder="Поиск"
              type="text"
              value={search}
            />
            <div
              className={search.length ? "closed" : "displayNone"}
              onClick={() => setSearch("")}
            ></div>
          </div>
          <div className="header-menu">
            <Link to={"/favorites"}>
              <div
                className={`menu-img ${
                  location.pathname == "/favorites" && "active"
                }`}
              >
                <img src="/images/icons/wishlist-icon.svg" alt="heart" />
              </div>

            </Link>
            <div
              className={`menu-img ${location.pathname == "/cart" && "active"}`}
            >
              <Link to={user.email?.length ? "/cart" : "/login"}>
                <img src="/images/icons/bag.svg" alt="bag" />
              </Link>
            </div>
            <div className="menu-img">
              <Link to={"/login"}>
                <p onClick={() => logOutUser()}>
                  {user.email?.length ? "Выйти" : "Войти"}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <NavList />
      </div>
    </div>
  );
};

export default Header;
