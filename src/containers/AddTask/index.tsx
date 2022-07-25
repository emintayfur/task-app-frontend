import styles from '../../styles/for-containers/AddTask.module.css';
import RiseTechLogo from '../../assets/svg/riseTechLogo.svg';
import Button, { ButtonColor, ButtonSize } from '../../components/Button';
import InputField from '../../components/InputField';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';

const addTaskInitialValues = {
    taskPriority: '',
    taskDesc: '',
};

const AddTaskContainer = () => {
    const handleAddTaskFormSubmit = useCallback((values: any) => {
        console.log('values', values);
    }, []);

    return (
        <div className={styles.container}>
            <Formik
                initialValues={addTaskInitialValues}
                onSubmit={handleAddTaskFormSubmit}
            >
                <Form>
                    <div className={styles.leftContainer}>
                        <RiseTechLogo viewBox="0 0 223.67 234.18" />

                        <Button
                            noShadow
                            title="Normal"
                            size={ButtonSize.small}
                            color={ButtonColor.lightBlue}
                            onClick={() => null}
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
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default AddTaskContainer;
