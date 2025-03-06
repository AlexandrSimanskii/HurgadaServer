import NavList from "../NavList/NavList";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-nav">
   <NavList/>
          <div className="inform">
            <h2 className="inform-title">LM</h2>
            <p className="adress">
              г. Анапа, Анапское шоссе,
              <br />
              30 Ж/К Черное море
            </p>
            <div className="bottom-line">
              <p className="phone">
                <a href="tel:89648999119">8 (964) 89 99 119</a>
              </p>
              <p className="insta">
                <Link   to={"https://www.instagram.com/"}   target="_blank">INSTAGRAM</Link>
              </p>
              <p className="mail">
                <Link to={"https://mail.google.com/mail/u/0/#inbox"} target="_blank">mebel_loft_anapa@mail.ru</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
