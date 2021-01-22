import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.Header}>
      <h1 className={styles.title}>Turn Order Tracker</h1>
    </header>
  );
};

export default Header;
