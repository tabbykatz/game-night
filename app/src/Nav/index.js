import { NavLink } from "react-router-dom";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import styles from "./styles.module.scss";

const Nav = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <>
      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>{" "}
        |<NavLink to="games">Game Collection</NavLink>|
        <NavLink to="events">Events</NavLink>
      </nav>
      <Auth />
    </>
  ) : (
    <div className={styles.greeting}>
      <Login />
      <img src="./logo.png" alt="" />
    </div>
  );
};

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();
  return isAuthenticated ? (
    <>
      <div className={styles.greeting}>
        <Logout />
        <div className={styles.hex}>
          <img src={user.picture} alt="" />
        </div>
      </div>
    </>
  ) : null;
};

export default Nav;
