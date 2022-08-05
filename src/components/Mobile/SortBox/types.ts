import { IBoxGlobal } from '../../../containers/Mobile/Box/types';
import { IOrderStateItem } from '../../../store/reducers/order';

export interface ISortBoxProps extends IBoxGlobal {}

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
