import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard";
import Games from "../Games";
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
          <Route path="/games" element={<Protected component={Games} />} />
          <Route path="/events" element={<Protected component={Events} />} />
          <Route
            path="/create-event"
            element={<Protected component={CreateEvent} />}
          />
        </Routes>
      </main>
    </>
  );
};
// TODO: move this
const Events = () => <h1>Events</h1>;
const CreateEvent = () => <h1>Create an Event</h1>;
// end TODO

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
