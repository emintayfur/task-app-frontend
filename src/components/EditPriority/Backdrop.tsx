import styles from '../../styles/for-components/EditPriority.module.css';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearEdit } from '../../store/actions/edit';

const EditPriorityBackdrop = () => {
    const editState = useAppSelector((state) => state.edit);
    const dispatch = useAppDispatch();

    const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (e) => {
            e.preventDefault();
            dispatch(clearEdit());
        },
        [dispatch],
    );

    if (!editState.id) return <></>;
    return <div onClick={handleClick} className={styles.backdrop} />;
};

export default EditPriorityBackdrop;
