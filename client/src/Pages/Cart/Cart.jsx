import { Fragment, useContext } from "react";
import { CustomContext } from "../../utils/Context/Context";
import axios from "../../utils/Axios/Axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const { addCardsCountPlus, addCardsCountMinus, user, navigate, setUser } =
    useContext(CustomContext);

  const deleteCard = (elem) => {
    axios
      .patch(`api/users/${user.id}`, {
        carts: user.carts.filter((el) => el.id !== elem.id),
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      });
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cart__inner">
          <div className="cart__top">
            <div className="cart__top-title">Ваша корзина</div>
            <div className="cart__top-position">
              {`${user.carts?.length} ${
                user.carts?.length.toString().at(-1) == 1
                  ? "позиция"
                  : "позиций"
              }  `}
            </div>
          </div>

          {user.carts?.map((item) => (
            <Fragment key={item._id}>
              <div className="cart__card">
                <img src={item.image} alt="furnish" />

                <div className="cart__card-content">
                  <h4>{item.title}</h4>
                  <dl className="cart__card-inform">
                    <div>
                      <dt>Размер(Ш×Д×В):</dt>
                      <dd>
                        {item.deep} × {item.width} × {item.height}
                      </dd>
                    </div>
                  </dl>{" "}
                  <div className="cart__card-delete">
                    <button onClick={() => addCardsCountMinus(item._id)}>
                      -
                    </button>

                    <span>{item.count}</span>
                    <button onClick={() => addCardsCountPlus(item._id)}>
                      +
                    </button>
                  </div>
                </div>
                <h5>Цена {item.price} р</h5>
                <h5>Сумма {item.price * item.count}</h5>
                <div
                  onClick={() => {
                    deleteCard(item);
                  }}
                  className="cart__card-closed"
                >
                  <img src="images/image/cross.svg" alt="cross" />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <div>
          {user.carts?.length ? (
            <div className="cart__bottom">
              <p>
                Итоговая сумма{" "}
                {user.carts?.reduce(
                  (acc, rec) => acc + rec.price * rec.count,
                  0
                )}{" "}
                p
              </p>

              <button onClick={() => navigate("/checkout")}>
                Оформить заказ
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
