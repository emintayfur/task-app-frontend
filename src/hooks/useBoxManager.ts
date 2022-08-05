import { useCallback, useState } from 'react';

export interface IBoxManager {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useBoxManager = (initialValue?: boolean): IBoxManager => {
    const [isOpen, setIsOpen] = useState(Boolean(initialValue));

    const handler = useCallback(
        (value: boolean) => () => {
            setIsOpen(value);
        },
        [],
    );

    const open = handler(true);
    const close = handler(false);

    return {
        isOpen,
        open,
        close,
    };
};

export default useBoxManager;
