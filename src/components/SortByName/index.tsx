import styles from '../../styles/for-components/SortByName.module.css';
import React, { useCallback, useMemo } from 'react';
import SortByNameIcon from './SortByNameIcon';
import { classNameList } from '../../utils/className';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setOrder } from '../../store/actions/order';
import { IOrderStateItem } from '../../store/reducers/order';
import Tip from '../../constants/tip';
import Tippy from '@tippyjs/react';
import { ISortByNameProps } from './types';

const SortByName = (props: ISortByNameProps) => {
    const { disabled } = props;
    const dispatch = useAppDispatch();
    const orderState = useAppSelector((state) => state.order);

    const value = useMemo(() => {
        return orderState.find((order) => order.key === 'text')?.value || 0;
    }, [orderState]);

    const handleChangeValue = useCallback(() => {
        const valueRange = [-1, 0, 1];
        const newValue = valueRange[(valueRange.indexOf(value) + 1) % 3];

        dispatch(
            setOrder(
                orderState.map((order) => {
                    return {
                        ...order,
                        value: order.key === 'text' ? newValue : order.value,
                    } as IOrderStateItem;
                }),
            ),
        );
    }, [value, dispatch, orderState]);

    const isDeActive = useMemo(() => {
        return Boolean(value === 0 || disabled);
    }, [value, disabled]);

    return (
        <Tippy content={Tip.order.text[value]} arrow={false}>
            <button
                className={classNameList([
                    styles.buttonContainer,
                    isDeActive ? styles.deActive : undefined,
                ])}
                type="button"
                onClick={disabled ? undefined : handleChangeValue}
                disabled={disabled}
            >
                <SortByNameIcon value={value} />
            </button>
        </Tippy>
    );
};

export default SortByName;
