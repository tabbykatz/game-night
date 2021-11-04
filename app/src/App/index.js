import * as React from "react";

import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import AddGames from "../AddGames";
import CreateEvent from "../CreateEvent";
import Dashboard from "../Dashboard";
import EventDetails from "../EventDetails";
import GameDetails from "../GameDetails";
import MyEvents from "../MyEvents";
import MyGames from "../MyGames";
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
            element={<Protected component={MyGames} limit={0} />}
          />
          <Route path="/events" element={<Protected component={MyEvents} />} />
          <Route
            path="/games/:id"
            element={<Protected component={GameDetails} />}
          />
          <Route
            path="/events/:id"
            element={<Protected component={EventDetails} />}
          />
          <Route
            path="/events/:id/games"
            element={<Protected component={AddGames} />}
          />
          <Route
            path="/events/create"
            element={<Protected component={CreateEvent} />}
          />
        </Routes>
        <Toaster />
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
      <p>
        This is going to be a splash page sorta place for explaining what the
        app does/ a place to land when you are not logged in.
      </p>
    </>
  );
};

export default App;
