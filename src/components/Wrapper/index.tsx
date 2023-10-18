import { useState, useRef, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { WrapperProps } from './index.props';
import cn from 'classnames';
import ActionButton from '../ActionButton';
import { ReactComponent as AddSvg } from '../../assets/plus.svg';
import { CategoryWrapper } from '../CategoryWrapper';
import { getBgColor } from '../../helpers/getBgColor';

import styles from './index.module.scss';
import { IElement } from '../../types';

const Wrapper = ({
  centered,
  scaleValue,
  setCentered,
}: WrapperProps): JSX.Element => {
  const [categories, setCategories] = useState<IElement[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const bgColor = useMemo(() => getBgColor(), []);
  const draggableZoneRef = useRef<HTMLDivElement | null>(null);
  const [x1, setX1] = useState<number>(0);
  const [x2, setX2] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);

  const [widthWrapper, setWidth] = useState(0);

  useEffect(() => {
    const scaleFactor = scaleValue || 1;
    const observer = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width * scaleFactor);
    });
    const wrapperElement = wrapperRef.current;

    if (wrapperElement) {
      wrapperElement.style.left = '50%';
      wrapperElement.style.top = '50%';
      wrapperElement.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
      observer.observe(wrapperElement);
    }

    return () => {
      if (wrapperElement) {
        observer.unobserve(wrapperElement);
      }
    };
  }, [scaleValue]);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (wrapperElement && centered) {
      wrapperElement.style.left = '50%';
      wrapperElement.style.top = '50%';
      wrapperElement.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
    }
  }, [centered]);

  const handleDeleteButtonClick = (categoryIdToDelete: string) => {
    setCategories(prevCategories => {
      const updatedCategory = prevCategories.filter(
        cat => cat.id !== categoryIdToDelete,
      );
      return updatedCategory;
    });
  };

  const handleAddButtonClick = () => {
    const newId = uuidv4();
    const newCategory = {
      text: '',
      id: newId,
    };
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setCentered(false);
    const parentElement = draggableZoneRef.current;
    const element = wrapperRef.current;

    if (!parentElement || !element) return;

    setShiftX(event.clientX - element.offsetLeft);
    setShiftY(event.clientY - element.offsetTop);
    setIsDragging(true);

    parentElement.style.cursor = 'move';
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const parentElement = draggableZoneRef.current;
    const element = wrapperRef.current;

    if (!parentElement || !element) return;

    let left = event.nativeEvent.clientX - shiftX;
    let top = event.nativeEvent.clientY - shiftY;

    element.style.left = left + 'px';
    element.style.top = top + 'px';
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    const parentElement = draggableZoneRef.current;
    if (parentElement) {
      parentElement.style.cursor = 'auto';
    }
  };

  return (
    <div
      ref={draggableZoneRef}
      className={styles.draggableZone}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'relative',
      }}
    >
      <div
        ref={wrapperRef}
        className={cn(styles.wrapper)}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
        }}
      >
        <div
          className={cn(styles.categoryWrapper, {
            [styles.noCategories]: categories.length === 0,
          })}
        >
          <span>Categories</span>
          <div className={cn(styles.actions)}>
            <ActionButton appearance="grey" onClick={handleAddButtonClick}>
              <AddSvg />
            </ActionButton>
          </div>
        </div>
        <div className={styles.lineWrapper}>
          {categories.length > 1 ? (
            <div className={styles.line} style={{ left: x1, right: x2 }}></div>
          ) : (
            <></>
          )}
          <div
            ref={categoriesRef}
            className={styles.categories}
            style={{ marginTop: categories.length < 2 ? '30px' : '60px' }}
          >
            {categories.map(cat => (
              <CategoryWrapper
                scaleValue={scaleValue}
                bgColor={bgColor}
                width={widthWrapper}
                key={cat.id}
                category={cat}
                handleDeleteClick={() => handleDeleteButtonClick(cat.id)}
                parentRef={categoriesRef}
                setX1={setX1}
                setX2={setX2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
