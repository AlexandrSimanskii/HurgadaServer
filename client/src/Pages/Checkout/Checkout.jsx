import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../../utils/Context/Context";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { user, addOrders, navigate } = useContext(CustomContext);

  const [popupTimer, setPopupTimer] = useState(10);
  const [popup, setPopup] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const pay = watch("pay");
  const submitForm = (data) => {
    console.log(data);
    let order = {
      ...data,
      order: user.carts,

      totalPrice: user.carts?.reduce((acc, el) => acc + el.price * el.count, 0),
    };
    addOrders(order, setPopup, redirect);
  };

  const redirect = () => {
    setInterval(() => {
      setPopupTimer((prev) => {
        return prev > 1 ? prev - 1 : navigate("/");
      });
    }, 1000);
  };

  return (
    <section className="checkout">
      <div className="container">
        <div className="checkout__inner">
          <form action="submit" onSubmit={handleSubmit(submitForm)}>
            <div className="user__inform">
              <div className="form__field">
                <h5>Данные покупателя</h5>
                <input
                  {...register("name")}
                  defaultValue={user.username}
                  placeholder="Имя"
                  type="text"
                />
                <input
                  {...register("email")}
                  defaultValue={user.email}
                  placeholder="Email"
                  type="email"
                />
                <input
                  {...register("number")}
                  defaultValue={user.number}
                  placeholder="Телефон"
                  type="phone"
                />
              </div>
              <div className="form__field">
                <h5>Адресс покупателя</h5>

                <input {...register("city")} placeholder="Город" type="text" />
                <input
                  {...register("street")}
                  placeholder="Улица"
                  type="text"
                />
                <input {...register("home")} placeholder="Дом" type="text" />
                <input
                  {...register("flat")}
                  placeholder="Квартира"
                  type="text"
                />
              </div>
              <div className="form__field">
                <h5>Коментарии</h5>
                <textarea
                  {...register("info")}
                  placeholder="Дополнительная информация"
                  name="info"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>

            <div className="order__inform">
              <table>
                <caption>Ваш заказ</caption>
                <thead></thead>

                <tbody>
                  <tr>
                    <td>Товар</td>
                    <td>Кол-во</td>
                    <td> Всего</td>
                  </tr>

                  {user.carts?.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.title}</td>
                        <td>{item.count}</td>
                        <td>{item.price * item.count} руб</td>
                      </tr>
                    );
                  })}

                  <tr>
                    <td>Итого</td>
                    <td>
                      {user.carts?.reduce(
                        (acc, el) => acc + el.price * el.count,
                        0
                      )}
                      руб
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="checkout__payment">
                <p>Способы оплаты</p>

                <div className="checkout__payment-choice">
                  <label className="checkout-label">
                    Наличные
                    <input
                      {...register("pay")}
                      name="pay"
                      type="radio"
                      value="Наличные"
                      checked={pay === "Наличные"}
                   
                    />
                  </label>
                  <label className="checkout-label">
                    Картой
                    <input
                      {...register("pay")}
                      name="pay"
                      type="radio"
                      value="Банковская карта"
                      checked={pay === "Банковская карта"}
                  
                    />
                  </label>
                </div>

                <button>Разместить заказ</button>
              </div>
            </div>
          </form>
        </div>
        {popup && (
          <div className="popup">
            <h2>Заказ оформлен</h2>
            <p>Через {popupTimer}сек. вас перекинет на главную страницу</p>
            <button onClick={() => navigate("/")}>Перейти на главную</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;
