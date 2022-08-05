import styles from '../../../styles/for-containers/FilterBox.module.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MobileBox from '../../../components/Mobile/Box';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Tip from '../../../constants/tip';
import IconX from '../../../assets/svg/icons/x.svg';
import {
    compareFilters,
    comparePriorities,
    INITIAL_FILTER_STATE,
} from '../../../store/reducers/filter';
import { clearFilter, setFilter } from '../../../store/actions/filter';
import MultiCheck from '../../../components/Mobile/MultiCheck';
import { IFilterBoxProps } from './types';

const filterBoxFormInitialValues = {
    contains: '',
    priorities: [],
};

const FilterBox = (props: IFilterBoxProps) => {
    const { boxManager } = props;
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.filter);
    const priorityList = useAppSelector(
        (state) => state.priority.fetchedData.list,
    );
    const [filterState, setFilterState] = useState(filterBoxFormInitialValues);

    const setFilterStateValue = useCallback(
        (key: keyof typeof filterBoxFormInitialValues, value: any) => {
            setFilterState({
                ...filterState,
                [key]: value,
            });
        },
        [filterState],
    );

    const handleSubmit = useCallback(
        (values: any) => () => {
            dispatch(setFilter(values));
            boxManager.close();
        },
        [dispatch, boxManager],
    );

    const handleClickCancelButton = useCallback(() => {
        dispatch(clearFilter());
        boxManager.close();
    }, [dispatch, boxManager]);

    const submitButton = useMemo(() => {
        return {
            title: 'Tamam',
            onClick: handleSubmit(filterState),
            disabled: compareFilters(filter, filterState),
        };
    }, [filterState, filter, handleSubmit]);

    const cancelButton = useMemo(() => {
        if (
            comparePriorities(
                filterState.priorities,
                filter.initialPriorities,
            ) &&
            INITIAL_FILTER_STATE.contains === filterState.contains
        )
            return undefined;

        return { title: 'Temizle', onClick: handleClickCancelButton };
    }, [filter, filterState, handleClickCancelButton]);

    useEffect(() => {
        setFilterState({
            contains: filter.contains,
            priorities: filter.priorities as any,
        });
    }, [filter]);

    return (
        <MobileBox
            id="filter"
            isOpen={boxManager.isOpen}
            title="Filtreler"
            submitButton={submitButton}
            cancelButton={cancelButton}
            handleBackdropClick={boxManager.close}
        >
            <div className={styles.mainContainer}>
                {/** Search Query */}
                <div className={styles.searchQueryContainer}>
                    {filterState.contains && (
                        <button
                            type="button"
                            className={styles.searchQueryClearButton}
                            onClick={() => setFilterStateValue('contains', '')}
                        >
                            <IconX
                                width="1.5rem"
                                height="1.5rem"
                                viewBox="0 0 64 64"
                            />
                        </button>
                    )}
                    <input
                        value={filterState.contains}
                        type="text"
                        className={styles.searchQueryInput}
                        placeholder={Tip.input.search}
                        onChange={(e) =>
                            setFilterStateValue('contains', e.target.value)
                        }
                    />
                </div>

                {/** Priorities */}
                <div className={styles.prioritySelectorContainer}>
                    <MultiCheck
                        value={filterState.priorities}
                        onChange={(value) =>
                            setFilterStateValue('priorities', value)
                        }
                        options={priorityList.map((priority) => ({
                            name: priority.name,
                            value: priority.id,
                        }))}
                    />
                </div>
            </div>
        </MobileBox>
    );
};

export default FilterBox;
