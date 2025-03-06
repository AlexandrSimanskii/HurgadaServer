import axios from "../../utils/Axios/Axios.js";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CustomContext = createContext();

const Context = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pages, setPages] = useState(1);
  const [user, setUser] = useState({ Email: "" });
  const [hitSale, setHitSale] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const { pathname } = useLocation();
  const [authError, setAuthError] = useState("");

  //Получить все продукты

  const getAllProducts = async () => {
    const products = await axios(
      "/api/products/get?limit=6"
    );
    let res = await products.json();
    setProducts(res);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // startUserContent
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (localStorage.getItem("favorites") !== null) {
      setFavorites(JSON.parse(localStorage.getItem("favorites")));
    }
  }, []);

  //Регистрация
  const registerUser = async (user) => {
    try {
      const res = await axios.post("/api/auth/signup", user);
      setUser(res.data);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      setAuthError(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  //Войти в профиль
  const loginUser = async (user) => {
    try {
      const res = await axios.post("/api/auth/signin", user);

      setUser(res.data);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      setAuthError(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  // Выйти из профиля
  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser({ Email: "" });
  };

  // Получить продукты с наибольшей скидкой
  const getHitSale = () => {
    axios
      .get("api/products/get?sort=sale&limit=8")
      .then((res) => setHitSale(res.data))
      .catch((error) => console.log(error));
  };

  // Получить продукты-фавориты

  const favoritesHandler = (product) => {
    let findProduct = favorites.some((item) => item._id === product._id);
    if (findProduct) {
      setFavorites((prev) => prev.filter((item) => item._id !== product._id));
    } else {
      setFavorites((prev) => [...prev, product]);
    }
  };

  // Получить сегодняшнюю дату
  const getToday = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

    return formattedDate;
  };

  // Added in the cart
  const addCarts = (product) => {
    console.log(user);
    axios
      .patch(`api/users/${user._id}`, {
        carts: [...user.carts, { ...product, count: 1, data: getToday() }],
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const addCardsCountPlus = (id) => {
    axios
      .patch(`api/users/${user.id}`, {
        carts: user.carts.map((item) => {
          if (item.id === id) {
            return { ...item, count: item.count + 1 };
          } else {
            return item;
          }
        }),
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const addCardsCountMinus = (id) => {
    axios
      .patch(`api/users/${user.id}`, {
        carts:
          user.carts.find((item) => item.id === id).count > 1
            ? user.carts.map((item) => {
                if (item.id === id) {
                  return { ...item, count: item.count - 1 };
                }
                return item;
              })
            : user.carts.filter((item) => item.id !== id),
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const addOrders = async (order, setPopup, redirect) => {
    try {
      const res = await axios.patch(`api/user/update/order/${user._id}`, {
        orders: [...user.orders, order],
        carts: [],
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setPopup(true);
      redirect();
    } catch (error) {
      console.error("Не удалось оформить заказ", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, pathname]);

  const value = {
    user,
    setUser,
    registerUser,
    loginUser,
    logOutUser,
    navigate,
    hitSale,
    getHitSale,
    favorites,
    favoritesHandler,
    search,
    setSearch,
    location,
    addCarts,
    addCardsCountPlus,
    addCardsCountMinus,
    addOrders,
    category,
    setCategory,
    products,
    setProducts,
    pages,
    setPages,
    activeItem,
    setActiveItem,
    authError,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};

export default Context;
