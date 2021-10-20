import * as React from "react";

import Games from "../Games";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();

  const Recents = () => {
    return <h1>list of recently added games +all games button</h1>;
  };

  const UpcomingEvents = () => {
    return <h1>list of some upcoming events +more button</h1>;
  };
  return isAuthenticated ? (
    <>
      <Recents />
      <UpcomingEvents />
    </>
  ) : null;
};

export default Dashboard;
