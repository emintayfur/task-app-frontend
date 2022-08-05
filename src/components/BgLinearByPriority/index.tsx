import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { IBgLinearByPriorityProps } from './types';

const BgLinearByPriority = (props: IBgLinearByPriorityProps) => {
    const { isMobile } = props;
    const priority = useAppSelector((state) => state.priority);

    const activePriority = useMemo(() => {
        if (
            !(
                priority.selectedPriority &&
                priority.is.fetched &&
                Object.keys(priority.fetchedData.obj).length &&
                priority.fetchedData.obj[priority.selectedPriority] &&
                priority.fetchedData.obj[priority.selectedPriority]
                    .linearClassName
            )
        ) {
            return null;
        }

        return priority.fetchedData.obj[priority.selectedPriority];
    }, [priority]);

    let linearClassName = activePriority?.linearClassName;
    if (isMobile) linearClassName = 'bg-linear-green';

    if (!linearClassName) return <></>;
    return (
        <div
            className={`duration-300 transition-all ease-in-out flex fixed top-0 left-0 w-full h-full z-10 ${linearClassName}`}
        />
    );
};

export default BgLinearByPriority;
