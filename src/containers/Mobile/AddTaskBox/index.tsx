import styles from '../../../styles/for-containers/AddTaskBox.module.css';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { nanoid } from 'nanoid';
import MobileBox from '../../../components/Mobile/Box';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedPriority } from '../../../store/actions/priority';
import { addTask } from '../../../store/actions/tasks';
import { TASK_TEXT_MAX_LENGTH } from '../../../store/reducers/tasks';
import Tip from '../../../constants/tip';
import { IAddTaskBoxProps } from './types';

const AddTaskBox = (props: IAddTaskBoxProps) => {
    const { boxManager } = props;
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useAppDispatch();
    const priorities = useAppSelector((state) => state.priority);

    const activePriority = useMemo(() => {
        return (
            priorities.fetchedData.obj[priorities?.selectedPriority || ''] || {}
        );
    }, [priorities.fetchedData.obj, priorities.selectedPriority]);

    const remainingLength = useMemo(() => {
        return TASK_TEXT_MAX_LENGTH - text.length;
    }, [text]);

    const submitIsDisabled = useMemo(() => {
        return !text.length || remainingLength < 0;
    }, [text, remainingLength]);

    const handleChangeSelectedPriority = useCallback(
        (priorityId: string) => () => {
            dispatch(setSelectedPriority(priorityId));
            if (textAreaRef?.current) {
                textAreaRef.current.focus();
            }
        },
        [dispatch, textAreaRef],
    );

    const onInputChange = useCallback<
        React.ChangeEventHandler<HTMLTextAreaElement>
    >((e) => {
        setText(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        if (submitIsDisabled) return;

        dispatch(
            addTask({
                id: nanoid(),
                text,
                priority: activePriority.id,
                createdAt: new Date().toISOString(),
            }),
        );

        boxManager.close();
    }, [submitIsDisabled, dispatch, text, activePriority, boxManager]);

    useEffect(() => {
        if (!boxManager.isOpen) {
            setText('');
        }
    }, [boxManager.isOpen]);

    return (
        <MobileBox
            id="add-task"
            isOpen={boxManager.isOpen}
            title="Görev Oluştur"
            submitButton={{
                title: 'Ekle',
                onClick: handleSubmit,
                disabled: submitIsDisabled,
                bg: activePriority?.color?.primary,
            }}
            cancelButton={{ title: 'Vazgeç', onClick: boxManager.close }}
            handleBackdropClick={boxManager.close}
        >
            <div className={styles.container}>
                <div className={styles.prioritySelectorContainer}>
                    {priorities.fetchedData.list.map(
                        (priority, priorityIdx) => (
                            <div
                                key={`priority_button_${priority.id}_${priorityIdx}`}
                            >
                                <button
                                    className={styles.priorityButton}
                                    style={{
                                        backgroundColor:
                                            priority?.color?.primary,
                                        opacity:
                                            priority.id ===
                                            priorities.selectedPriority
                                                ? 1
                                                : 0.5,
                                    }}
                                    onClick={handleChangeSelectedPriority(
                                        priority.id,
                                    )}
                                >
                                    {priority.name}
                                </button>
                            </div>
                        ),
                    )}
                </div>

                <div className={styles.textContainer}>
                    <div className={styles.remainingLength}>
                        <span>{remainingLength}</span>
                    </div>
                    <textarea
                        ref={textAreaRef}
                        value={text}
                        className={styles.textArea}
                        placeholder={Tip.input.add}
                        onChange={onInputChange}
                        style={{
                            outlineColor: activePriority?.color?.primary,
                        }}
                    />
                </div>
            </div>
        </MobileBox>
    );
};

export default AddTaskBox;
