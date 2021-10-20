import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard";
import Nav from "../Nav";
import Search from "../Search";
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
  return (
    <>
      <header className={styles.header}>
        <h1>Home</h1>
      </header>
    </>
  );
};

export default App;
