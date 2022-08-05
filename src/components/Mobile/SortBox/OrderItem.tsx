import { IOrderItemProps } from './types';
import { valueStrToOrderType } from '../../../constants/order';

const SortOrderItem = (props: IOrderItemProps) => {
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

export default SortOrderItem;
