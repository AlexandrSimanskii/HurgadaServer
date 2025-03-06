// import React from 'react';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CustomContext } from "../../utils/Context/Context";
const About = () => {
  const { user } = useContext(CustomContext);
  const [message, setMessage] = useState("");
  const handlerOnChange = (e) => {
    e.preventDefault()
    console.log(e.target.value);
    setMessage(e.target.value);
  };
console.log(user.email);
  return (
    <section className="about">
      <div className="container">
        <div className="about-inner">
          <h3>Свяжитесь с нами для доставки</h3>
          <div className="about-inform">
            <form className="about-form" action="submit">
              <label>
                Ваше имя <input type="text" defaultValue={user.username} />
              </label>
              <label>
                Ваш e-mail <input type="text" defaultValue={user?.email} />
              </label>
              <label>
                Сообщение{" "}
                <textarea value={message} onChange={handlerOnChange} />
              </label>

              <Link
                to={`mailto:simabmv@mail.ru?body= Сообщение`}
              >
                <button>Отправить</button>
              </Link>

            </form>
            <ul className="about__list">
              <li className="about__list-number">
                <a href="tel:89648999119">8 (964) 899 91 19</a>
              </li>

              <Link to={"https://www.mail.ru"} target="_blank">
                <li className="about__list-mail">mebel_Loft_anapa@mail.ru</li>
              </Link>
              <Link to={"https://www.instagram.com/"} target="_blank">
                <li className="about__list-insta">INSTAGRAM</li>
              </Link>
              <li className="about__list-adress">
                <address>
                  Адресс:г.Анапа,Анапское шоссе,30 Ж/К Черное море
                </address>
              </li>
            </ul>
          </div>
          <div className="about__map">
            <h3>Адресс нашей компании</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2826.240564998806!2d37.35162667586021!3d44.898101771070344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ee0b69f1263823%3A0x5eec2adefbc3acd5!2z0JDQvdCw0L_RgdC60L7QtSDRiC4sIDMwLCDQkNC90LDQv9CwLCDQmtGA0LDRgdC90L7QtNCw0YDRgdC60LjQuSDQutGA0LDQuSwgMzUzNDQ1!5e0!3m2!1sru!2sru"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
