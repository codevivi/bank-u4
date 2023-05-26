import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../../Contexts/AuthCtx";
import useLogout from "../../hooks/useLogout";
function Header() {
  const location = useLocation();
  const path = location.pathname;
  const { auth } = useContext(AuthCtx);
  const [logout] = useLogout();

  return (
    <header className="page-header">
      <div className="container">
        <Link className="logo" to="/">
          <img src={logo} alt="React bank logo" width={96} />
          <span>React Bankas</span>
        </Link>
        {path !== "/login" && (
          <nav>
            <ul>
              {auth?.user && path !== "/accounts" && (
                <li>
                  <Link to="/accounts">Sąskaitos</Link>
                </li>
              )}
              {auth?.user && (
                <li className="logout">
                  <p>{auth.user.name}</p>
                  <button onClick={logout}>Atisjungti</button>
                </li>
              )}
              {!auth?.user && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
