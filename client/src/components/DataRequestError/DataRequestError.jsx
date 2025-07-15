import React from "react";
import styles from "./DataRequestError.module.css";

function DataRequestError({ message }) { 
  return (
    <div className={styles.error}>{`${message}`}</div>
  );
}

export default DataRequestError;