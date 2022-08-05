export interface IMultiCheckFieldItem {
    value: string;
    name: string;
}
export interface IMultiCheckProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: IMultiCheckFieldItem[];
}
