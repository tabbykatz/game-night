import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Games from "../Games";
import Nav from "../Nav";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import { Protected } from "../auth/widgets";

import styles from "./styles.module.scss";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loading, apiClient } = useApi();

  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      apiClient.addOrUpdateUser(user);
    }
  }, [isAuthenticated, user, loading, apiClient]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Protected component={Dashboard} />}
          />
          <Route path="/search" element={<Protected component={Search} />} />
        </Routes>
      </main>
    </>
  );
};

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <header className={styles.header}>
        <h1>{process.env.REACT_APP_TITLE}</h1>
        <p>{process.env.REACT_APP_SUBTITLE}</p>
      </header>
      {isAuthenticated ? <Games /> : null}
    </>
  );
};

const Dashboard = () => <h1>Dashboard</h1>;
const Search = () => <h1>Search for Games</h1>;
export default App;
