import styles from './Styles.module.css';
import { PropTypes } from 'prop-types';

Icon.propTypes = {
  icon: PropTypes.svg
};

export default function Icon({ icon }) {
  return (
    <svg className={styles.icon} viewBox={icon.viewBox}>
      <use href={'#' + icon.id} />
    </svg>
  );
}
