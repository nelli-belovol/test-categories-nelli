import { useState } from 'react';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import { ICoefficient } from './types';
import './index.css';
import styles from './App.module.scss';
import { coefficients } from './constants/coefficients';

function App() {
  const [centered, setCentered] = useState(false);
  const [selectedCoefficient, setSelectedCoefficient] = useState<ICoefficient>(
    coefficients[8],
  );

  const handleSelect = (coefficient: ICoefficient) => {
    setSelectedCoefficient(coefficient);
  };

  const changeCoefficient = (delta: number) => {
    const currentIndex = coefficients.findIndex(
      coefficient => coefficient.value === selectedCoefficient.value,
    );

    const newIndex = currentIndex + delta;
    if (newIndex >= 0 && newIndex < coefficients.length) {
      setSelectedCoefficient(coefficients[newIndex]);
    }
  };

  const decrementScale = () => changeCoefficient(-1);
  const incrementScale = () => changeCoefficient(1);

  const handleCenterPosition = () => {
    setCentered(true);
  };

  return (
    <div className={styles.mainContainer}>
      <Header
        handleCenterPosition={handleCenterPosition}
        decrementScale={decrementScale}
        incrementScale={incrementScale}
        scaleLabel={selectedCoefficient.label}
        handleSelect={handleSelect}
      />

      <Wrapper
        scaleValue={selectedCoefficient.value}
        centered={centered}
        setCentered={setCentered}
      />
    </div>
  );
}

export default App;
