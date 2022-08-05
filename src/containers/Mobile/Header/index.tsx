import styles from '../../../styles/for-containers/MobileHeader.module.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import RiseTechLogo from '../../../assets/svg/riseTechLogo.svg';

import SortIcon from '../../../assets/svg/icons/sort-icon.svg';
import FilterActive from '../../../assets/svg/icons/filter-active.svg';
import FilterDeActive from '../../../assets/svg/icons/filter-deActive.svg';
import FilterResultText from '../../../components/Mobile/FilterResultText';
import { useAppSelector } from '../../../store/hooks';
import { isInitialFilter } from '../../../store/reducers/filter';
import { IMobileHeaderProps } from './types';
import useBoxManager from '../../../hooks/useBoxManager';
import AddTaskBox from '../AddTaskBox';
import FilterBox from '../FilterBox';
import SortBox from '../SortBox';

const MobileHeader = (props: IMobileHeaderProps) => {
    const { filteredItemCount, itemCount } = props;
    const [cloneHeaderHeight, setCloneHeaderHeight] = useState(0);
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

            return <span className={styles.searchText}>{text}</span>;
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

    useEffect(() => {
        let val = 0;

        if (
            containerRef?.current?.offsetHeight &&
            containerRef?.current?.offsetTop
        )
            val =
                containerRef?.current?.offsetHeight +
                containerRef?.current?.offsetTop;

        setCloneHeaderHeight(val);
    }, [containerRef]);

    return (
        <>
            <div ref={containerRef} className={styles.container}>
                {/* Left Section */}
                <div className={styles.leftSection}>
                    <div className={styles.logoOrSearchTextContainer}>
                        {headerLeft}
                    </div>

                    {Boolean(itemCount) && (
                        <div className={styles.leftSectionActions}>
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
                    className={styles.rightSection}
                    onClick={addTaskBoxManager.open}
                >
                    <span>Görev Oluştur</span>
                </button>
            </div>

            {/** Clone */}
            {containerRef?.current && (
                <div
                    className={styles.headerClone}
                    style={{
                        height: cloneHeaderHeight,
                    }}
                />
            )}

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
