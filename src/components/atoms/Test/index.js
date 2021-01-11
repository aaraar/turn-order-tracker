import React from 'react';
import PropTypes from 'prop-types';

import styles from './Test.module.scss';

const Test = ({ children }) => {
  return (
    <button className={styles.button}>
      <span>{children}</span>
    </button>
  );
};

export default Test;

Test.propTypes = {
  children: PropTypes.any
};
