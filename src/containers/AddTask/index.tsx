import { nanoid } from 'nanoid';
import styles from '../../styles/for-containers/AddTask.module.css';
import RiseTechLogo from '../../assets/svg/riseTechLogo.svg';
import Button, { ButtonColor, ButtonSize } from '../../components/Button';
import InputField from '../../components/InputField';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask } from '../../store/actions/tasks';
import Tippy from '@tippyjs/react';
import Tip from '../../constants/tip';
import { setSelectedPriority } from '../../store/actions/priority';
import { clearSearchQuery } from '../../store/actions/filter';
import SortByName from '../../components/SortByName';

const addTaskInitialValues = {
    task: '',
};

const AddTaskContainer = () => {
    const priority = useAppSelector((state) => state.priority);

    const dispatch = useAppDispatch();

    const activePriority = useMemo(() => {
        if (
            !(
                priority.selectedPriority &&
                priority.is.fetched &&
                Object.keys(priority.fetchedData.obj).length &&
                priority.fetchedData.obj[priority.selectedPriority]
            )
        ) {
            return null;
        }

        return priority.fetchedData.obj[priority.selectedPriority];
    }, [priority]);

    const priorityList = useMemo(() => {
        if (
            !(
                priority.selectedPriority &&
                priority.is.fetched &&
                Array.isArray(priority.fetchedData.list) &&
                priority.fetchedData.list.length
            )
        ) {
            return [];
        }

        return priority.fetchedData.list;
    }, [priority]);

    const formIsDisabled = useMemo(() => {
        return !priority.is.fetched;
    }, [priority.is.fetched]);

    const handleAddTaskFormSubmit = useCallback(
        (values: any, { resetForm }: any) => {
            if (!values?.task || !values?.task?.length) return;

            if (priority.selectedPriority) {
                dispatch(
                    addTask({
                        id: nanoid(),
                        priority: priority.selectedPriority,
                        text: values.task,
                        createdAt: new Date().toISOString(),
                    }),
                );

                dispatch(clearSearchQuery());
                resetForm();
            }
        },
        [priority.selectedPriority, dispatch],
    );

    const handleClickPriorityButton = useCallback(
        (e: any) => {
            e.preventDefault();

            const activePriorityIndex = priorityList.findIndex(
                (board) => activePriority?.id === board.id,
            );

            let newIndex = activePriorityIndex + 1;
            if (newIndex > priorityList.length - 1) newIndex = 0;

            dispatch(setSelectedPriority(priorityList[newIndex].id));
        },
        [activePriority, priorityList, dispatch],
    );

    return (
        <div
            className={styles.container}
            style={{
                color: activePriority?.color?.primary,
                borderColor: activePriority?.color?.secondary,
            }}
        >
            <Formik
                initialValues={addTaskInitialValues}
                onSubmit={handleAddTaskFormSubmit}
            >
                {(formikProps) => (
                    <Form>
                        <div className={styles.leftContainer}>
                            <RiseTechLogo />

                            <SortByName disabled={formIsDisabled} />

                            <Tippy
                                content={Tip.setPriorityButton}
                                disabled={formIsDisabled}
                            >
                                <Button
                                    noShadow
                                    title={activePriority?.name || '...'}
                                    size={ButtonSize.small}
                                    color={ButtonColor.lightBlue}
                                    disabled={formIsDisabled}
                                    style={{
                                        backgroundColor:
                                            activePriority?.color?.secondary,
                                        color: activePriority?.color?.primary,
                                        width: 120,
                                    }}
                                    onClick={handleClickPriorityButton}
                                />
                            </Tippy>

                            <div className={styles.inputContainer}>
                                <InputField
                                    disabled={formIsDisabled}
                                    fieldProps={{
                                        name: 'task',
                                    }}
                                />
                            </div>
                        </div>

                        <Button
                            noBg
                            bold
                            title="Ekle"
                            className={styles.submitButton}
                            color={ButtonColor.lightBlue}
                            disabled={Boolean(
                                !formikProps.values.task?.length ||
                                    formikProps.errors.task ||
                                    formIsDisabled,
                            )}
                            size={ButtonSize.small}
                            component="button"
                            style={{ color: activePriority?.color?.primary }}
                            onClick={(e) => {
                                e.preventDefault();
                                formikProps.submitForm().then();
                            }}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddTaskContainer;
