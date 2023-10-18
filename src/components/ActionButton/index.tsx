import { ButtonProps } from './index.props';
import cn from 'classnames';

import styles from './index.module.scss';

const ActionButton = ({
  children,
  appearance,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.actionButton, className, {
        [styles.red]: appearance == 'red',
        [styles.grey]: appearance == 'grey',
        [styles.orange]: appearance == 'orange',
        [styles.green]: appearance == 'green',
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
