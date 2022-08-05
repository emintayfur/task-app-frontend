import styles from '../../styles/for-components/EditPriority.module.css';
import React, { useCallback, useEffect, useMemo } from 'react';
import IconX from '../../assets/svg/icons/x.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearEdit } from '../../store/actions/edit';
import { changeTaskPriority } from '../../store/actions/tasks';
import useMobileViewController from '../../hooks/useMobileViewController';
import Tippy from '@tippyjs/react';
import Tip from '../../constants/tip';

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
    const isMobile = useMobileViewController();

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

    const closeEditBox = useCallback(() => {
        dispatch(clearEdit());
    }, [dispatch]);

    const changeTaskPriorityEvent = useCallback(
        (priorityId: string) => () => {
            const taskId = edit.id;
            if (taskId) {
                closeEditBox();
                dispatch(changeTaskPriority({ priorityId, taskId }));
            }
        },
        [dispatch, edit.id, closeEditBox],
    );

    useEffect(() => {
        if (isMobile) {
            const body = document.querySelector('body');
            if (body) body.style.overflow = edit.id ? 'hidden' : 'auto';
        }
    }, [edit.id, isMobile]);

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

                    <Tippy
                        disabled={isMobile}
                        content={Tip.editAction.cancel}
                        arrow={false}
                        placement="bottom"
                    >
                        <button
                            type="button"
                            className="z-40 select-none"
                            onClick={closeEditBox}
                        >
                            <IconX viewBox="0 0 64 64" width={22} height={22} />
                        </button>
                    </Tippy>
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
