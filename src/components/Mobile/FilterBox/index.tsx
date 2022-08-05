import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MobileBox from '../../../containers/Mobile/Box';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Tip from '../../../constants/tip';
import IconX from '../../../assets/svg/icons/x.svg';
import {
    compareFilters,
    comparePriorities,
    INITIAL_FILTER_STATE,
} from '../../../store/reducers/filter';
import { clearFilter, setFilter } from '../../../store/actions/filter';
import MultiCheck from '../MultiCheck';
import { IFilterBoxProps } from './types';

const filterBoxFormInitialValues = {
    contains: '',
    priorities: [],
};

const FilterBox = (props: IFilterBoxProps) => {
    const { boxManager } = props;
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.filter);
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
        // todo reset form
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
            <div className="flex flex-col gap-5 px-8 w-full box-border">
                {/** Search Query */}
                <div className="flex relative items-center">
                    {filterState.contains && (
                        <button
                            type="button"
                            className="absolute right-3 text-grey-250 font-inter font-semibold text-[12px]"
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
                        className="font-inter font-medium text-grey-350 w-full bg-grey-200 rounded-lg p-2.5 outline-green-200 pr-10"
                        placeholder={Tip.input.search}
                        onChange={(e) =>
                            setFilterStateValue('contains', e.target.value)
                        }
                    />
                </div>

                {/** Priorities */}
                <div className="my-2">
                    <MultiCheck
                        value={filterState.priorities}
                        onChange={(value) =>
                            setFilterStateValue('priorities', value)
                        }
                        options={[
                            {
                                name: 'Acil',
                                value: 'urgent',
                            },
                            {
                                name: 'Önemli',
                                value: 'important',
                            },
                            {
                                name: 'Normal',
                                value: 'normal',
                            },
                        ]}
                    />
                </div>
            </div>
        </MobileBox>
    );
};

export default FilterBox;
