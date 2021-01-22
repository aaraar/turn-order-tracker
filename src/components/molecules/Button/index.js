import styles from './Button.module.scss';
import Icon from '@/components/atoms/Icon';

const Button = ({ icon, onClick = (e) => console.log(e), children }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      {icon && (
        <div className={styles.icon}>
          <Icon icon={icon} />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
