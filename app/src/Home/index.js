import * as React from "react";

import styles from "./styles.module.scss";

const Home = () => {
  return (
    <>
      <div className={styles.tagline}>
        <img src="./logo.png" className={styles.logo} alt="" />
        <h1>Build your collection.</h1>
      </div>
      <div className={styles.tagline}>
        <h1>Create events and invite your friends.</h1>
        <img src="./logo.png" className={styles.logo} alt="" />
      </div>
      <div className={styles.tagline}>
        <img src="./logo.png" className={styles.logo} alt="" />
        <h1>See all the games coming to the event and add your own!</h1>
      </div>
    </>
  );
};

export default Home;
