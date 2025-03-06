import { useContext, useEffect, useState, Fragment } from "react";
import { CustomContext } from "../../utils/Context/Context";
import { useForm } from "react-hook-form";
import axios from "../../utils/Axios/Axios";

const PersonRoom = () => {
  const { user, setUser } = useContext(CustomContext);
  const [orders, setOrders] = useState([]);
  const [pop, setPop] = useState(false);

  const getAllOrders = () => {
    let order = user?.orders?.map((item) => item.order).flat();
    return order;
  };

  useEffect(() => {
    setOrders(getAllOrders());
  }, [user]);

  return (
    <section className="room">
      <div className="container">
        <div className="room__inner">
          <ul className="room__bonus">
            <h4>Бонусная программа</h4>
            <li className="room__bonus-list">
              <p>
                У вас {""}
                {user.id
                  ? orders &&
                    Math.round(
                      (orders.reduce((acc, el) => acc + el.price, 0) / 100) * 3
                    )
                  : 0}
                {""} бонусных баллов
              </p>
              <a>Правила бонусной программы</a>
            </li>
          </ul>
          <ul className="program-conditions">
            <li className="program-conditions__cashback">
              Возвращаем до 7% на бонусный счет
            </li>
            <li className="program-conditions__rub">1 бонус = 1 рубль</li>
            <li className="program-conditions__present">
              Оплачивайте бонусами до 20% от покупки
            </li>
          </ul>
          <div className="room__bottom">
            {user.orders?.length && (
              <table>
                <caption>Купленные товары</caption>
                <thead>
                  <tr>
                    <td>Товар</td>
                    <td>Цена</td>
                    <td>Количество</td>
                    <td>Дата</td>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((item) => {
                    return (
                      <Fragment key={item.id}>
                        <tr>
                          <td>
                            <img
                              className="room__bottom-img"
                              src={item.image}
                              alt=""
                            />
                          </td>

                          <td>{item.price} руб</td>
                          <td>{item.count} </td>
                          <td>{item.data}</td>
                        </tr>
                      </Fragment>
                    );
                  })}
                  {/* <tr>
                  <td>
                    <img src={orders && orders[0]?.image} alt="" />
                  </td>
                  <td>{orders && orders[0]?.price} руб</td>
                  <td>{orders && orders[0]?.count} </td>
                  <td>{user?.orders?.[0].date}</td>
                </tr> */}
                </tbody>
              </table>
            )}
          </div>
          {pop ? (
            <div className="popup">
              <img src="images/image/bonus.jpg" alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonRoom;
