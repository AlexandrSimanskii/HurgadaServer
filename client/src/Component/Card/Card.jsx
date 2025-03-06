import { Link, useNavigate } from "react-router-dom";
import { CustomContext } from "../../utils/Context/Context";
import { useContext } from "react";

const Card = ({ item }) => {
  const {
    favorites,
    favoritesHandler,
    user,
    addCarts,
    addCardsCountPlus,
    addCardsCountMinus,
  } = useContext(CustomContext);
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card__top">
        <div className="card__sale">
          {item.sale > 0 ? (
            <>
              <img src="/images/icons/sale-red.svg" alt="sale" />
              <p>{item.sale} %</p>
            </>
          ) : (
            ""
          )}
        </div>
        <img
          onClick={() => favoritesHandler(item)}
          className="card__favorite"
          src={
            favorites.some((el) => el._id === item._id)
              ? "/images/icons/HeartRed.svg"
              : "/images/icons/favorite.svg"
          }
          alt=""
        />
      </div>

      <div className="card__main">
        <div className="main-img">
          <Link to={`/product/${item._id}`}>
            <img src={`/${item.image}`} alt="category" />
          </Link>
        </div>
        <h3 className="main-title">{item.title}</h3>
        <p className="main-category">{item.category}</p>
        <div className="price-box">
          <p className="main-price">{item.price}</p>
          <p className="main-sale">37 990₽</p>
        </div>
      </div>
      <div className="card__bottom">
        <h3 className="bottom-title">Размеры</h3>

        <dl className="bottom-table">
          <div className="bottom-table__item">
            <dt>Ширина</dt>
            <dd>{item.width} cm</dd>
          </div>
          <div className="bottom-table__item">
            <dt>Глубина</dt>
            <dd>{item.deep} cm</dd>
          </div>
          <div className="bottom-table__item">
            <dt>Высота</dt>
            <dd>{item.height} cm</dd>
          </div>
        </dl>

        {user.carts?.some((el) => el._id == item._id) ? (
          <div className="card__counter">
            {" "}
            <button onClick={() => addCardsCountMinus(item._id)}>-</button>
            <span> {user.carts.find((el) => el._id === item._id).count}</span>
            <button onClick={() => addCardsCountPlus(item._id)}>+</button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              if ("_id" in user) {
                addCarts(item);
                console.log(item);
              } else {
                navigate("/login");
              }
            }}
            className="bottom-btn"
          >
            Добавить в корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
