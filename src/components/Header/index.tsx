/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react';
import { HeaderProps } from './index.props';
import { ReactComponent as LocationSvg } from '../../assets/compass.svg';
import { ReactComponent as MinusSvg } from '../../assets/minus.svg';
import { ReactComponent as PlusSvg } from '../../assets/plus.svg';

import styles from './index.module.scss';
import { coefficients } from '../../constants/coefficients';

const Header = ({
  handleCenterPosition,
  decrementScale,
  incrementScale,
  handleSelect,
  scaleLabel,
}: HeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handleListView = () => {};

  const handleIncrement = () => {
    incrementScale();
    setIsOpen(false);
  };

  const handleDecrement = () => {
    decrementScale();
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>
        <p>Servicies</p>
        <span>0</span>
      </h2>
      <div className={styles.actions}>
        <div onClick={handleListView} className={styles.listView}>
          List view
        </div>
        <div onClick={handleCenterPosition} className={styles.locationWrap}>
          <LocationSvg />
        </div>
        <div className={styles.scaleWrap}>
          <div onClick={handleDecrement} className={styles.scaleBlock}>
            <MinusSvg />
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className={styles.scaleChooseWrapper}
          >
            <div className={styles.scaleValue}>{scaleLabel}</div>
            {isOpen ? (
              <ul className={styles.scalesList}>
                {coefficients.map(coefficient => (
                  <li
                    key={coefficient.value}
                    onClick={() => handleSelect(coefficient)}
                  >
                    {coefficient.label}
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
          <div onClick={handleIncrement} className={styles.scaleBlock}>
            <PlusSvg />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
