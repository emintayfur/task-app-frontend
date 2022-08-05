import styles from '../../../styles/for-containers/TaskListIsEmptyMessage.module.css';
import React from 'react';
import NotFoundPattern from '../../../assets/svg/notFoundPattern.svg';

const TaskListIsEmptyMessage = () => {
    return (
        <div className={styles.container}>
            <NotFoundPattern className={styles.illustration} />

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Liste Boş{' '}
                    <span role="img" aria-hidden="false">
                        😎
                    </span>
                </h1>
                <p className={styles.message}>
                    Sanırım tüm işlerini tamamladın veya hiç eklemedin. Eğer hiç
                    eklemediysen <strong>“Görev Oluştur”</strong> diyerek
                    kendine bir iş yaratabilirsin :)
                </p>
            </div>
        </div>
    );
};

export default TaskListIsEmptyMessage;
