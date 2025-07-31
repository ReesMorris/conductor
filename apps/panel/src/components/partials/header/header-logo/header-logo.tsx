import { Link } from '@/components/ui';
import { APP_NAME } from '@/constants';
import { route } from '@/utils/route';
import { styles } from './header-logo.styles';

export const HeaderLogo = () => {
  return (
    <div className={styles.container}>
      <Link unstyled href={route('HOME')} className={styles.link}>
        <div className={styles.name}>{APP_NAME}</div>
      </Link>
    </div>
  );
};
