import { NavLink } from "react-router-dom";

import useAuth0 from "../auth/useAuth0";
import { Login, Logout } from "../auth/widgets";

import styles from "./styles.module.scss";

const Nav = () => (
  <nav className={styles.nav}>
    <NavLink to="/" end>
      Home
    </NavLink>{" "}
    | {/*most of this nav is just for me right now | */}
    <NavLink to="dashboard">Dashboard</NavLink>|{" "}
    <NavLink to="search">Search</NavLink>|{" "}
    <NavLink to="games">All Games</NavLink>
    <Auth />
  </nav>
);

const Auth = () => {
  const { isAuthenticated, user } = useAuth0();
  return isAuthenticated ? (
    <>
      <div className={styles.greeting}>
        Hello, {user.given_name} <Logout />
        <div className={styles.hex}>
          <img src={user.picture} alt="" />
        </div>
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Nav;
