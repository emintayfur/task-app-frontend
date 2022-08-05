import styles from '../../../styles/for-components/SortBox.module.css';
import { IOrderItemProps } from './types';
import { valueStrToOrderType } from '../../../constants/order';

const SortOrderItem = (props: IOrderItemProps) => {
    const { index, title, labels, value = 0, onClick } = props;

    let valueLabel = null;
    let orderType = valueStrToOrderType[value.toString()];
    if (orderType in labels)
        valueLabel = labels[orderType as keyof typeof labels];

    return (
        <button className={styles.orderItemMainContainer} onClick={onClick}>
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
