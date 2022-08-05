import styles from '../../../styles/for-components/SortBox.module.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MobileBox from '../../../components/Mobile/Box';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    INITIAL_ORDER_STATE,
    IOrderStateItem,
} from '../../../store/reducers/order';
import { clearOrder, setOrder } from '../../../store/actions/order';
import { IOrderItem, ISortBoxProps } from './types';
import SortOrderItem from './OrderItem';
import { orderTypes } from '../../../constants/order';

const SortBox = (props: ISortBoxProps) => {
    const { boxManager } = props;
    const dispatch = useAppDispatch();

    const orderState = useAppSelector((state) => state.order);
    const [orderStateClone, setOrderStateClone] = useState<IOrderStateItem[]>([
        ...orderState,
    ]);

    const handleSubmit = useCallback(() => {
        dispatch(setOrder(orderStateClone));
        boxManager.close();
    }, [dispatch, orderStateClone, boxManager]);

    const handleCancel = useCallback(() => {
        dispatch(clearOrder());
        boxManager.close();
    }, [dispatch, boxManager]);

    const isInitial = useMemo(() => {
        return (
            JSON.stringify(INITIAL_ORDER_STATE) === JSON.stringify(orderState)
        );
    }, [orderState]);

    const foundChange = useMemo(() => {
        return JSON.stringify(orderState) !== JSON.stringify(orderStateClone);
    }, [orderState, orderStateClone]);

    const cancelButton = useMemo(() => {
        if (isInitial) return undefined;

        return { title: 'Sıfırla', onClick: handleCancel };
    }, [isInitial, handleCancel]);

    const submitButton = useMemo(() => {
        return {
            title: 'Kaydet',
            onClick: handleSubmit,
            disabled: !foundChange,
        };
    }, [handleSubmit, foundChange]);

    const handleClick = useCallback(
        (order: IOrderItem, orderIdx: number, value: number = 0) =>
            () => {
                const orderValues = [1, -1, 0];
                const newValue =
                    orderValues[(orderValues.indexOf(value) + 1) % 3];

                if (!newValue) {
                    setOrderStateClone(
                        orderStateClone.filter(
                            (orderState) => orderState.key !== order.by,
                        ),
                    );
                    return;
                }

                let clone = [...orderStateClone];
                if (orderIdx === -1)
                    clone.push({
                        key: order.by,
                        value: newValue,
                    } as IOrderStateItem);

                setOrderStateClone(
                    clone.map((orderState) => {
                        let val: any = orderState.value;
                        if (orderState.key === order.by) val = newValue;

                        return { ...orderState, value: val };
                    }),
                );
            },
        [orderStateClone],
    );

    useEffect(() => {
        setOrderStateClone([...orderState]);
    }, [orderState]);

    return (
        <MobileBox
            id="order"
            isOpen={boxManager.isOpen}
            title="Sırala"
            cancelButton={cancelButton}
            submitButton={submitButton}
            handleBackdropClick={boxManager.close}
        >
            <div className={styles.container}>
                {orderTypes.map((order) => {
                    const foundOrderIndex = orderStateClone.findIndex(
                        (orderStateItem) => orderStateItem.key === order.by,
                    );
                    const foundOrder = orderStateClone[foundOrderIndex];

                    return (
                        <SortOrderItem
                            key={`task-order-by-${order.by}`}
                            index={foundOrderIndex}
                            value={foundOrder?.value}
                            onClick={handleClick(
                                order,
                                foundOrderIndex,
                                foundOrder?.value,
                            )}
                            {...order}
                        />
                    );
                })}
            </div>
        </MobileBox>
    );
};

export default SortBox;
