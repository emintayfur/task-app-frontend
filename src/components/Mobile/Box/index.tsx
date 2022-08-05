import styles from '../../../styles/for-containers/MobileBox.module.css';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MobileBoxBackdrop from './Backdrop';
import { IMobileBoxProps } from './types';
import { boxAnimateConstant } from './animate';

const MobileBox = (props: IMobileBoxProps) => {
    const {
        id,
        title,
        cancelButton,
        submitButton,
        handleBackdropClick,
        children,
        isOpen,
    } = props;

    return (
        <AnimatePresence>
            {isOpen && (
                <MobileBoxBackdrop onClick={handleBackdropClick} id={id} />
            )}
            {isOpen && (
                <motion.div
                    key={`box-${id}`}
                    className={styles.container}
                    initial={boxAnimateConstant.box.initial}
                    animate={boxAnimateConstant.box.animate}
                    exit={boxAnimateConstant.box.exit}
                >
                    {/** Header */}
                    <div className={styles.header}>
                        <h1 className={styles.title}>{title}</h1>

                        {cancelButton && (
                            <button
                                className={styles.cancelButton}
                                onClick={cancelButton.onClick}
                            >
                                <span>{cancelButton.title}</span>
                            </button>
                        )}
                    </div>

                    {/** Content */}
                    <div>{children}</div>

                    {/** Submit Button */}
                    {submitButton && (
                        <div className={styles.submitButtonContainer}>
                            <button
                                className={styles.submitButton}
                                onClick={
                                    submitButton.disabled
                                        ? undefined
                                        : submitButton.onClick
                                }
                                style={{ backgroundColor: submitButton?.bg }}
                                disabled={submitButton.disabled}
                            >
                                <span>{submitButton.title}</span>
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileBox;
