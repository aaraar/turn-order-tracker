import styles from './Styles.module.css';

export default function Icon({ icon }) {
  return (
    <svg className={styles.icon} viewBox={icon.viewBox}>
      <use href={'#' + icon.id} />
    </svg>
  );
}
