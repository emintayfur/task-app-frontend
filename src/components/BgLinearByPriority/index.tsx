import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import Board from '../../constants/board';

const BgLinearByPriority = () => {
    const priority = useAppSelector((state) => state.priority);

    const activePriority = useMemo(() => {
        return Board[priority];
    }, [priority]);

    if (!activePriority?.linearClassName) return <></>;
    return (
        <div
            className={`duration-300 transition-all ease-in-out flex fixed top-0 left-0 w-full h-full z-10 ${activePriority.linearClassName}`}
        />
    );
};

export default BgLinearByPriority;
