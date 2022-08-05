import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { nanoid } from 'nanoid';
import MobileBox from '../../../containers/Mobile/Box';
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
            <div className="flex flex-col gap-5 px-6 w-full box-border">
                <div className="flex pb-3 gap-4 overflow-x-auto">
                    {priorities.fetchedData.list.map(
                        (priority, priorityIdx) => (
                            <div
                                key={`priority_button_${priority.id}_${priorityIdx}`}
                            >
                                <button
                                    className="py-2 px-6 min-w-[100px] rounded-lg font-inter font-medium text-white transition-all ease-in-out duration-300"
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

                <div className="flex relative">
                    <div className="absolute top-5 right-3 text-grey-250 font-inter font-semibold text-[12px]">
                        <span>{remainingLength}</span>
                    </div>
                    <textarea
                        ref={textAreaRef}
                        value={text}
                        className="font-inter font-medium text-grey-350 w-full bg-grey-200 rounded-lg p-4 pr-10 resize-none min-h-[140px]"
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
