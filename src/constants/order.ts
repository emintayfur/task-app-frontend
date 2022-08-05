import { IOrderItem } from '../containers/Mobile/SortBox/types';

export const valueStrToOrderType: any = {
    '-1': 'asc',
    '0': 'default',
    '1': 'desc',
};

export const orderTypes: IOrderItem[] = [
    {
        id: 'order-by-priority',
        by: 'priority',
        title: 'Önceliğe göre',
        labels: {
            default: 'Kapalı',
            asc: 'Düşükten Yükseğe',
            desc: 'Yüksekten Düşüğe',
        },
    },
    {
        id: 'order-by-text',
        by: 'text',
        title: 'Metne göre',
        labels: {
            default: 'Kapalı',
            asc: "A'dan Z'ye",
            desc: "Z'den A'ya",
        },
    },
];
