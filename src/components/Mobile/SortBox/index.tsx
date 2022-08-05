import React, { useCallback, useMemo, useState } from 'react';
import MobileBox from '../../../containers/Mobile/Box';
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
                const currentIndex = orderValues.indexOf(value);

                let newIndex = currentIndex + 1;
                if (newIndex > orderValues.length - 1) newIndex = 0;

                const newValue = orderValues[newIndex];

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

    return (
        <MobileBox
            id="order"
            isOpen={boxManager.isOpen}
            title="Sırala"
            cancelButton={cancelButton}
            submitButton={submitButton}
            handleBackdropClick={boxManager.close}
        >
            <div className="flex flex-col gap-5 px-6 w-full box-border">
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
