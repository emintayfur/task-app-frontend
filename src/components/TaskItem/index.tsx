import styles from '../../styles/for-components/TaskItem.module.css';
import { useCallback, useMemo, useRef } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import dayjs from 'dayjs';
import Tippy from '@tippyjs/react';
import { ITaskItemProps } from './types';
import { APP_DATETIME_FORMAT } from '../../constants/dayjs';
import Tip from '../../constants/tip';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setDeletingTaskId } from '../../store/actions/deletingTaskId';
import { deleteTask } from '../../store/actions/tasks';

import TrashIcon from '../../assets/svg/icons/trash.svg';
import IconPen from '../../assets/svg/icons/pen.svg';
import IconX from '../../assets/svg/icons/x.svg';
import { setEdit } from '../../store/actions/edit';
import useMobileViewController from '../../hooks/useMobileViewController';

const classNameList = (arr: any[]) => {
    const filtered = arr.filter((arr) => arr);

    if (!filtered.length) return undefined;
    return filtered.join(' ');
};

const TaskItem = (props: ITaskItemProps) => {
    const {
        item: { id, text, createdAt, priority },
        borderColor,
    } = props;

    const editActionButtonRef = useRef<null | HTMLButtonElement>(null);
    const deletingTaskId = useAppSelector((state) => state.deletingTaskId);
    const dispatch = useAppDispatch();
    const [animateRef] = useAutoAnimate<any>();
    const isMobile = useMobileViewController();

    const deleteMe = useMemo(
        () => Boolean(deletingTaskId === id),
        [deletingTaskId, id],
    );

    const classNames = useMemo(() => {
        return {
            container: classNameList([
                styles.container,
                deleteMe && styles.redBorder,
            ]),
            deleteButton: classNameList([deleteMe && styles.deleteButton]),
            cancelButton: classNameList([deleteMe && styles.actionCancel]),
            confirmContent: classNameList([
                styles.content,
                styles.deleteContent,
            ]),
        };
    }, [deleteMe]);
    const handleEditButtonClick = useCallback(() => {
        if (editActionButtonRef.current) {
            const boundingClientRect =
                editActionButtonRef.current.getBoundingClientRect();

            dispatch(
                setEdit({
                    width: editActionButtonRef.current.offsetWidth,
                    top: boundingClientRect.top,
                    left: boundingClientRect.left,
                    id,
                    currentPriority: priority,
                }),
            );
        }
    }, [editActionButtonRef, dispatch, id, priority]);
    const handleDeleteButtonClick = useCallback(() => {
        if (!deleteMe) {
            dispatch(setDeletingTaskId(id));
            return;
        }

        dispatch(deleteTask(id));
    }, [dispatch, deleteMe, id]);
    const handleDeleteCancelButtonClick = useCallback(() => {
        if (deleteMe) dispatch(setDeletingTaskId(''));
    }, [deleteMe, dispatch]);

    return (
        <div
            className={classNames.container}
            ref={animateRef}
            style={{ borderLeftColor: isMobile ? borderColor : undefined }}
        >
            {/** Header */}
            <div className={styles.header}>
                {/** Date */}
                <div className={styles.date}>
                    <span>{dayjs(createdAt).format(APP_DATETIME_FORMAT)}</span>
                </div>

                {/** Actions */}
                <div className={styles.headerActions}>
                    {/** Cancel (Delete) */}
                    {deleteMe && (
                        <Tippy
                            disabled={isMobile}
                            content={Tip.deleteAction.cancel}
                            arrow={false}
                            placement="bottom"
                        >
                            <button
                                type="button"
                                onClick={handleDeleteCancelButtonClick}
                                className={classNames.cancelButton}
                            >
                                <IconX
                                    viewBox="0 0 64 64"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </Tippy>
                    )}

                    {/** Edit */}
                    {!deleteMe && (
                        <Tippy
                            disabled={isMobile}
                            content={Tip.editAction.edit}
                            arrow={false}
                            placement="bottom"
                        >
                            <button
                                type="button"
                                className="z-40 relative"
                                ref={editActionButtonRef}
                                onClick={handleEditButtonClick}
                            >
                                <IconPen
                                    viewBox="0 0 64 64"
                                    width={22}
                                    height={22}
                                />
                            </button>
                        </Tippy>
                    )}

                    {/** Delete */}
                    <Tippy
                        disabled={isMobile}
                        content={Tip.deleteAction.delete}
                        arrow={false}
                        placement="bottom"
                    >
                        <button
                            type="button"
                            onClick={handleDeleteButtonClick}
                            className={classNames.deleteButton}
                        >
                            <TrashIcon
                                viewBox="0 0 64 64"
                                width={20}
                                height={20}
                            />
                        </button>
                    </Tippy>
                </div>
            </div>

            {/** content */}
            {deleteMe && (
                <div className={classNames.confirmContent}>
                    Silmek istediğinden emin misin? Bu işlemi geri
                    alamayacaksın. Eğer silmekte kararlıysan lütfen sil butonuna
                    tekrar tıkla.
                </div>
            )}
            <div className={styles.content}>{text}</div>
        </div>
    );
};

export default TaskItem;
