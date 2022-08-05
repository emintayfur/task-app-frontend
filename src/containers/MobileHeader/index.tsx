import React, { useMemo, useRef } from 'react';
import RiseTechLogo from '../../assets/svg/riseTechLogo.svg';

import SortIcon from '../../assets/svg/icons/sort-icon.svg';
import FilterActive from '../../assets/svg/icons/filter-active.svg';
import FilterDeActive from '../../assets/svg/icons/filter-deActive.svg';
import FilterResultText from '../../components/Mobile/Filter/ResultText';
import { useAppSelector } from '../../store/hooks';
import { isInitialFilter } from '../../store/reducers/filter';
import { IMobileHeaderProps } from './types';
import useBoxManager from '../../hooks/useBoxManager';
import AddTaskBox from '../../components/Mobile/AddTaskBox';
import FilterBox from '../../components/Mobile/Filter/FilterBox';
import SortBox from '../../components/Mobile/SortBox';

const MobileHeader = (props: IMobileHeaderProps) => {
    const { filteredItemCount, itemCount } = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const filter = useAppSelector((state) => state.filter);

    const addTaskBoxManager = useBoxManager(false);
    const filterBoxManager = useBoxManager(false);
    const sortBoxManager = useBoxManager(false);

    const headerLeft = useMemo(() => {
        if (!filter.contains) return <RiseTechLogo width={20} height={20} />;
        else {
            const MAX_CHARACTER_LENGTH = 8;
            const text = `${filter.contains
                .slice(0, MAX_CHARACTER_LENGTH)
                .trim()}${
                filter.contains.length > MAX_CHARACTER_LENGTH ? '...' : ''
            }`;

            return (
                <span className="block font-medium text-green-200 w-full overflow-hidden truncate">
                    {text}
                </span>
            );
        }
    }, [filter.contains]);

    const filterIsActive = useMemo(() => {
        return !isInitialFilter(filter);
    }, [filter]);

    const filterIcon = useMemo(() => {
        const iconProps = {
            viewBox: '0 0 64 64',
            width: 24,
            height: 24,
        };

        let icon = FilterDeActive;
        if (filterIsActive) icon = FilterActive;

        return icon(iconProps);
    }, [filterIsActive]);
    const sortIcon = useMemo(() => {
        const iconProps = {
            viewBox: '0 0 64 64',
            width: 24,
            height: 24,
        };

        return SortIcon(iconProps);
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                className="flex gap-4 fixed top-4 left-0 right-0 mx-auto w-11/12 h-[60px] text-green-500 z-50"
            >
                {/* Left Section */}
                <div className="flex justify-between items-center bg-white h-full max-w-full flex-1 rounded-xl px-5 py-4 border shadow-md">
                    <div className="flex flex-1 max-w-[100px] overflow-hidden ">
                        {headerLeft}
                    </div>

                    {Boolean(itemCount) && (
                        <div className="flex gap-2">
                            <button type="button" onClick={sortBoxManager.open}>
                                {sortIcon}
                            </button>
                            <button
                                type="button"
                                onClick={filterBoxManager.open}
                            >
                                {filterIcon}
                            </button>
                        </div>
                    )}
                </div>

                {/** Right Section */}
                <button
                    className="w-[130px] text-[14px] font-semibold bg-white rounded-xl border shadow-md"
                    onClick={addTaskBoxManager.open}
                >
                    <span>Görev Oluştur</span>
                </button>
            </div>

            {/** Clone */}
            <div
                className="w-full"
                style={{
                    height:
                        (containerRef?.current?.offsetHeight || 0) +
                        (containerRef?.current?.offsetTop || 0),
                }}
            />

            {Boolean(filterIsActive && itemCount) && (
                <FilterResultText count={filteredItemCount} />
            )}

            {/** Add Task */}
            <AddTaskBox boxManager={addTaskBoxManager} />

            {/** Filters */}
            <FilterBox boxManager={filterBoxManager} />

            {/** Sort */}
            <SortBox boxManager={sortBoxManager} />
        </>
    );
};

export default MobileHeader;
