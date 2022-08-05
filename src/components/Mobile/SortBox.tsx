import React, { useCallback, useMemo, useState } from 'react';
import MobileBox from '../MobileBox';
import { IFilterBoxProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    INITIAL_ORDER_STATE,
    IOrderStateItem,
} from '../../store/reducers/order';
import { clearOrder, setOrder } from '../../store/actions/order';

const valueStrToOrderType: any = {
    '-1': 'asc',
    '0': 'default',
    '1': 'desc',
};

export interface IOrderItem {
    id: string;
    by: string;
    title: string;
    labels: {
        default: string;
        asc: string;
        desc: string;
    };
}

export interface IOrderItemProps extends IOrderItem {
    index: number;
    value?: IOrderStateItem['value'];
    onClick: () => void;
}

const OrderItem = (props: IOrderItemProps) => {
    const { index, title, labels, value = 0, onClick } = props;

    let valueLabel = null;
    let orderType = valueStrToOrderType[value.toString()];
    if (orderType in labels)
        valueLabel = labels[orderType as keyof typeof labels];

    return (
        <button
            className="flex justify-between items-center px-3 py-2 border-2 border-green-200 rounded-lg font-inter font-semibold text-xs"
            onClick={onClick}
        >
            {/* Order & Title */}
            <div className="flex items-center gap-2.5 text-grey-400">
                <div className="flex justify-center items-center w-6 h-6 rounded-full bg-green-200 text-white">
                    <span>{index + 1}</span>
                </div>
                <p>{title}</p>
            </div>

            {/** Order Value */}
            <div className="text-grey-500">
                <span>{valueLabel}</span>
            </div>
        </button>
    );
};

const orderTypes: IOrderItem[] = [
    {
        id: 'order-by-priority',
        by: 'priority',
        title: 'Önceliğe göre',
        labels: {
            default: 'Varsayılan',
            asc: 'Düşükten Yükseğe',
            desc: 'Yüksekten Düşüğe',
        },
    },
    {
        id: 'order-by-text',
        by: 'text',
        title: 'Metne göre',
        labels: {
            default: 'Varsayılan',
            asc: "A'dan Z'ye",
            desc: "Z'den A'ya",
        },
    },
];

const SortBox = (props: IFilterBoxProps) => {
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
                        <OrderItem
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
