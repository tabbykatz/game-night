import * as React from "react";

import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard";
import Events from "../Events";
import GameDetails from "../GameDetails";
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
          <Route
            path="/games"
            element={<Protected component={Games} limit={0} />}
          />
          <Route path="/events" element={<Protected component={Events} />} />
          <Route
            path="/games/:id"
            element={<Protected component={GameDetails} />}
          />
          <Route
            path="/create-event"
            element={<Protected component={CreateEvent} />}
          />
        </Routes>
        <Toaster />
      </main>
    </>
  );
};
// TODO: move this

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
