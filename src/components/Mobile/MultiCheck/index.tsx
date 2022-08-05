import styles from '../../../styles/for-components/MultiCheck.module.css';
import React, { useCallback } from 'react';
import { IMultiCheckProps } from './types';
import { classNameList } from '../../../utils/className';

const MultiCheck = (props: IMultiCheckProps) => {
    const { value: valueInProps, options, onChange } = props;

    const handleToggleCheckbox = useCallback(
        (value: string) => () => {
            const isChecked = valueInProps.includes(value);
            let newValue = [];

            if (isChecked)
                newValue = valueInProps.filter(
                    (selectedValue: string) => selectedValue !== value,
                );
            else newValue = [...valueInProps, value];

            onChange(newValue);
        },
        [valueInProps, onChange],
    );

    const setOneValue = useCallback(
        (value: string) => () => {
            onChange([value]);
        },
        [onChange],
    );

    return (
        <div className={styles.container}>
            {options.map((item, itemIdx) => {
                const isActive = valueInProps.includes(item.value);
                const onlySelectedThis =
                    valueInProps.length === 1 &&
                    valueInProps.includes(item.value);

                return (
                    <div
                        className={styles.itemGroup}
                        key={`multi_check_item_${item.value}_${itemIdx}`}
                    >
                        <button className={styles.itemName}>
                            <span>{item.name}</span>
                        </button>

                        <div className={styles.itemRightActions}>
                            <button
                                disabled={onlySelectedThis}
                                className={styles.actionOnly}
                                onClick={setOneValue(item.value)}
                            >
                                <span>Sadece</span>
                            </button>
                            <button
                                type="button"
                                className={classNameList([
                                    styles.actionSelect,
                                    isActive ? styles.active : undefined,
                                ])}
                                onClick={handleToggleCheckbox(item.value)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MultiCheck;
