import * as React from "react";

import Games from "../Games";
import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <Games /> : null;
};

export default Dashboard;
