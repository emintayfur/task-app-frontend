import styles from '../../../styles/for-components/SortBox.module.css';
import { IOrderItemProps } from './types';
import { valueStrToOrderType } from '../../../constants/order';
import { classNameList } from '../../../utils/className';
import { useMemo } from 'react';

const SortOrderItem = (props: IOrderItemProps) => {
    const { index, title, labels, value = 0, onClick } = props;

    let valueLabel = null;
    let orderType = valueStrToOrderType[value.toString()];
    if (orderType in labels)
        valueLabel = labels[orderType as keyof typeof labels];

    const isDeActive = useMemo(() => {
        return value === 0;
    }, [value]);

    return (
        <button
            className={classNameList([
                styles.orderItemMainContainer,
                isDeActive ? styles.deActive : undefined,
            ])}
            onClick={onClick}
        >
            {/* Order & Title */}
            <div className={styles.orderItemLeftContent}>
                <div className={styles.orderItemContentOrderIndex}>
                    <span>{index + 1}</span>
                </div>
                <p>{title}</p>
            </div>

            {/** Order Value */}
            <div className={styles.orderItemContentOrderValue}>
                <span>{valueLabel}</span>
            </div>
        </button>
    );
};

export default SortOrderItem;
