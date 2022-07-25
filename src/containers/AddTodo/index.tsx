import styles from '../../styles/for-containers/AddTask.module.css';
import RiseTechLogo from '../../assets/svg/riseTechLogo.svg';
import Button, { ButtonColor, ButtonSize } from '../../components/Button';
import InputField from '../../components/InputField';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Board from '../../constants/board';
import { boards } from '../../constants/lists';
import { setPriority } from '../../store/actions/priority';
import BoardId from '../../enums/BoardId';

const addTaskInitialValues = {
    todo: '',
};

const AddTodoContainer = () => {
    const priorityValue = useAppSelector((state) => state.priority);
    const dispatch = useAppDispatch();

    const handleAddTaskFormSubmit = useCallback((values: any) => {
        console.log('values', values);
    }, []);

    const activePriority = useMemo(() => {
        return Board[priorityValue];
    }, [priorityValue]);

    const handleClickPriorityButton = useCallback(
        (e: any) => {
            e.preventDefault();

            const filteredList = boards.filter(
                (board) => board.id !== BoardId.done,
            );

            const activePriorityIndex = filteredList.findIndex(
                (board) => activePriority.id === board.id,
            );

            let newIndex = activePriorityIndex + 1;
            if (newIndex > filteredList.length - 1) newIndex = 0;

            dispatch(setPriority(filteredList[newIndex].id));
        },
        [activePriority, dispatch],
    );

    return (
        <div
            className={styles.container}
            style={{
                color: activePriority.color?.primary,
                borderColor: activePriority?.color?.secondary,
            }}
        >
            <Formik
                initialValues={addTaskInitialValues}
                onSubmit={handleAddTaskFormSubmit}
            >
                <Form>
                    <div className={styles.leftContainer}>
                        <RiseTechLogo viewBox="0 0 223.67 234.18" />

                        <Button
                            noShadow
                            title={activePriority.name}
                            size={ButtonSize.small}
                            color={ButtonColor.lightBlue}
                            style={{
                                backgroundColor:
                                    activePriority?.color?.secondary,
                                color: activePriority?.color?.primary,
                                width: 120,
                            }}
                            onClick={handleClickPriorityButton}
                        />

                        <div className={styles.inputContainer}>
                            <InputField
                                fieldProps={{
                                    name: 'taskPriority',
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        noBg
                        bold
                        title="Ekle"
                        className="text-2xl"
                        color={ButtonColor.lightBlue}
                        size={ButtonSize.small}
                        onClick={() => null}
                        style={{ color: activePriority?.color?.primary }}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default AddTodoContainer;
