import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="h">
      <div className="container">
        <div className="header__top">
          <div className="header__top-left">
            <div className="burger-btn">
              <img
                className="burger-btn-img"
                alt="BurgMen"
                src="./burger.svg"
              />
            </div>

            <div className="change-location">
              <div className="change-location hthvel">[D-holder(place)]</div>
              <div className="change-location-aux hthvel">
                [D-holder(aux_info)]
              </div>
            </div>
          </div>
          <div className="header__central-logo">
            <img
              className="central-logo"
              src="./Central_logo_dynamic.gif"
              alt="altLogo"
            />
          </div>
          <div className="header__top-right">
            <nav className="header__nav">
              <ul className="header__nav__ul">
                <li className="li-elem">
                  <Link to="/menu" className="header__link hthvel">
                    Меню
                  </Link>
                </li>
                <li className="li-elem">
                  <Link to="/about" className="header__link hthvel">
                    Купоны(about)
                  </Link>
                </li>
                <li className="li-elem">
                  <Link to="/menu" className="header__link hthvel">
                    Акции(menu)
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header__login">
              <img className="header__login-img" src="./login_logo.png" />
              <p className="header__login-text hthvel">Войти [-NW]</p>
            </div>
            <div className="header__basket">
              <button className="header__basket-btn">
                {/* <svg /> */}
                <img
                  src="./header_basket.png"
                  className="header-basket-img"
                ></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
