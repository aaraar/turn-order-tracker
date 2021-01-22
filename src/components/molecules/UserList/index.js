// Styles
import styles from './UserList.module.scss';

const UserList = ({ users, loggedUser }) => {
  return (
    <div className={styles.UserList}>
      <h3>Users : {users.usersList?.length}</h3>
      <ul className={styles.list}>
        {users.usersList?.map((user, index) => (
          <li key={index} className={styles['list-item']}>
            <p>{user.userName}</p>
          </li>
        ))}
      </ul>

      <h3> User : {loggedUser?.userName} </h3>
    </div>
  );
};

export default UserList;
