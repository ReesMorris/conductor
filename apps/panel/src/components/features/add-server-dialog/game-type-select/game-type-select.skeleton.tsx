import { RadioCard } from '@/components/ui';
import { styles } from './game-type-select.styles';

export const GameTypeSelectSkeleton: React.FC = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 1 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is a static array
        <RadioCard.Skeleton key={index} />
      ))}
    </div>
  );
};
