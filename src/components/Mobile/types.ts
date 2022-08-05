import type { IBoxManager } from '../../hooks/useBoxManager';

interface IBoxGlobal {
    boxManager: IBoxManager;
}

export interface IAddTaskBoxProps extends IBoxGlobal {}

export interface IFilterBoxProps extends IBoxGlobal {}

export interface IMultiCheckFieldItem {
    value: string;
    name: string;
}
export interface IMultiCheckProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: IMultiCheckFieldItem[];
}
