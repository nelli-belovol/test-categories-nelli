import { useState, useEffect, useRef, useMemo } from 'react';
import { CategoryWrapperProps } from './index.props';
import ActionButton from '../ActionButton';
import { ReactComponent as AddSvg } from '../../assets/plus.svg';
import { ReactComponent as EditSvg } from '../../assets/pencil.svg';
import { ReactComponent as DeleteSvg } from '../../assets/cross.svg';
import { ReactComponent as ReadySvg } from '../../assets/checkmark.svg';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { getBgColor } from '../../helpers/getBgColor';

import styles from './index.module.scss';
import { IElement } from '../../types';
import { calculateOffset } from '../../helpers/calculateOffset';

export const CategoryWrapper = ({
  handleDeleteClick,
  bgColor,
  setX1,
  setX2,
  width,
  parentRef,
  category,
  scaleValue,
  className,
  ...props
}: CategoryWrapperProps): JSX.Element => {
  const inputCategoryBlockRef = useRef<HTMLDivElement | null>(null);
  const inputSubCategoryBlockRef = useRef<HTMLDivElement | null>(null);
  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [subCategories, setSubCategories] = useState<IElement[]>([]);
  const [subX1, setSubX1] = useState<number>(0);
  const [subX2, setSubX2] = useState<number>(0);

  useEffect(() => {
    const isFirstChild =
      parentRef.current?.firstElementChild === inputCategoryBlockRef.current;

    const isLastChild =
      parentRef.current?.lastElementChild === inputCategoryBlockRef.current;

    if (isFirstChild) {
      setX1(calculateOffset(inputWrapperRef, parentRef, scaleValue, true));
    }

    if (isLastChild) {
      setX2(calculateOffset(inputWrapperRef, parentRef, scaleValue, false));
    }
  }, [width]);

  const handleReadyClick = () => {
    if (inputValue.length) setIsEditing(false);
    else {
      setIsEditing(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClearInput = () => {
    setInputValue('');
  };

  const handleDeleteButtonClick = (categoryIdToDelete: string) => {
    setSubCategories(prevCategories => {
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
    setSubCategories(prevCategories => [...prevCategories, newCategory]);
  };
  const subBgColor = useMemo(() => getBgColor(), []);

  return (
    <div className={cn(styles.categoryBlock)} ref={inputCategoryBlockRef}>
      <div
        ref={inputWrapperRef}
        className={cn(styles.inputWrapper, {
          [styles.noCategories]: subCategories.length === 0,
        })}
      >
        <input
          type="text"
          onBlur={handleReadyClick}
          onFocus={() => setIsEditing(true)}
          value={inputValue}
          className={cn(styles.input)}
          onChange={e => setInputValue(e.target.value)}
          style={{ backgroundColor: !isEditing ? bgColor : 'white' }}
          {...props}
        />

        <div className={styles.actions}>
          {isEditing ? (
            <>
              <ActionButton appearance="orange" onClick={handleClearInput}>
                <DeleteSvg />
              </ActionButton>
              <ActionButton appearance="green" onClick={handleReadyClick}>
                <ReadySvg />
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton appearance="grey" onClick={handleAddButtonClick}>
                <AddSvg />
              </ActionButton>
              <ActionButton appearance="grey" onClick={handleEditClick}>
                <EditSvg />
              </ActionButton>
              <ActionButton appearance="red" onClick={handleDeleteClick}>
                <DeleteSvg />
              </ActionButton>
            </>
          )}
        </div>
      </div>

      <div className={styles.lineWrapper}>
        {subCategories.length > 1 ? (
          <div
            className={styles.line}
            style={{ left: subX1, right: subX2 }}
          ></div>
        ) : (
          <></>
        )}
        <div
          ref={inputSubCategoryBlockRef}
          className={styles.categories}
          style={{ marginTop: subCategories.length < 2 ? '30px' : '60px' }}
        >
          {subCategories.map(cat => (
            <CategoryWrapper
              scaleValue={scaleValue}
              bgColor={subBgColor}
              setX1={setSubX1}
              setX2={setSubX2}
              width={width}
              key={cat.id}
              category={cat}
              handleDeleteClick={() => handleDeleteButtonClick(cat.id)}
              parentRef={inputSubCategoryBlockRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
