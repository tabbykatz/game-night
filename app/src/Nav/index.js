import { NavLink as Link } from "react-router-dom";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import styles from "./styles.module.scss";

const Nav = () => {
  const { isAuthenticated, user } = useAuth0();

  return isAuthenticated ? (
    <header className={styles.authHeader}>
      <nav>
        <ul>
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="games">Game Collection</NavLink>
          <NavLink to="events">Events</NavLink>
        </ul>
      </nav>
      <Greeting picture={user.picture} />
    </header>
  ) : (
    <header className={styles.nonAuthHeader}>
      <Login />
      <img src="./logo.png" alt="" />
    </header>
  );
};

const Greeting = ({ picture }) => (
  <div className={styles.greeting}>
    <Logout />
    <img src={picture} alt="" />
  </div>
);

const NavLink = (props) => (
  <li>
    <Link {...props} />
  </li>
);

export default Nav;
