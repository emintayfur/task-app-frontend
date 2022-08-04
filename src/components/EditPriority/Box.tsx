import styles from '../../styles/for-components/EditPriority.module.css';
import React, { useCallback, useMemo } from 'react';
import IconPen from '../../assets/svg/icons/pen.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearEdit } from '../../store/actions/edit';
import { changeTaskPriority } from '../../store/actions/tasks';

const BOX = {
    padding: 18,
    width: 200,
};

const EditPriorityBox = () => {
    const dispatch = useAppDispatch();
    const edit = useAppSelector((state) => state.edit);
    const priorityList = useAppSelector(
        (state) => state?.priority?.fetchedData?.list,
    );

    const activePriority = useMemo(() => {
        const list = Array.isArray(priorityList) ? priorityList : [];
        return list?.find((priority) => priority.id === edit.currentPriority);
    }, [edit, priorityList]);
    const controlledList = useMemo(() => {
        const list = Array.isArray(priorityList) ? priorityList : [];
        return list.filter((priority) => priority.id !== edit.currentPriority);
    }, [priorityList, edit]);

    const position = useMemo(() => {
        let left = 0,
            top = 0;

        if (edit && edit.id && edit.top && edit.left) {
            const buttonOffset = {
                width: edit.width,
                top: edit.top,
                left: edit.left,
            };

            left =
                buttonOffset.left -
                (BOX.width - buttonOffset.width - BOX.padding);

            top = buttonOffset.top - BOX.padding;
        }

        return { left, top };
    }, [edit]);
    const boxStyle = useMemo(
        () => ({
            width: BOX.width,
            left: position.left,
            top: position.top,
        }),
        [position],
    );

    const changeTaskPriorityEvent = useCallback(
        (priorityId: string) => () => {
            const taskId = edit.id;
            if (taskId) {
                dispatch(clearEdit());
                dispatch(changeTaskPriority({ priorityId, taskId }));
            }
        },
        [dispatch, edit.id],
    );

    if (!edit.id) return <></>;
    return (
        <>
            <div className={styles.boxContainer} style={boxStyle}>
                {/** Header */}
                <div
                    className={styles.boxHeader}
                    style={{ padding: BOX.padding }}
                >
                    <h6 className="text-md font-semibold">
                        {activePriority?.name || 'Öncelik'}
                    </h6>

                    <button
                        type="button"
                        className="z-40 select-none cursor-default"
                    >
                        <IconPen viewBox="0 0 64 64" width={22} height={22} />
                    </button>
                </div>

                {/** List */}
                <ul className={styles.boxPriorityList}>
                    {controlledList.map((priority, priorityIdx) => (
                        <li key={`edit_priority_${priority.id}_${priorityIdx}`}>
                            <button
                                type="button"
                                onClick={changeTaskPriorityEvent(priority.id)}
                                className={styles.boxPriorityButton}
                                style={
                                    {
                                        '--priority-color-primary':
                                            priority?.color?.primary,
                                        '--priority-color-secondary':
                                            priority?.color?.secondary,
                                    } as any
                                }
                            >
                                {priority.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default EditPriorityBox;
