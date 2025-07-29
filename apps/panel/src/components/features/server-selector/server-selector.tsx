import { styles } from './server-selector.styles';

export const ServerSelector = () => {
  return (
    <select className={styles.select}>
      <option value='server1'>Server 1</option>
      <option value='server2'>Server 2</option>
      <option value='server3'>Server 3</option>
    </select>
  );
};
