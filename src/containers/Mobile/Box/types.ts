import type { ReactNode } from 'react';
import type { IBoxManager } from '../../../hooks/useBoxManager';

export interface IMobileBoxBackdropProps {
    id: string;
    onClick?: () => void;
}

export interface IMobileBoxProps {
    id: string;
    isOpen: boolean;
    title: string;
    submitButton?: {
        title: string;
        onClick?: () => void;
        bg?: string;
        disabled?: boolean;
    };
    cancelButton?: {
        title: string;
        onClick?: () => void;
    };
    handleBackdropClick?: IMobileBoxBackdropProps['onClick'];
    children?: ReactNode | ReactNode[];
}

export interface IBoxGlobal {
    boxManager: IBoxManager;
}
