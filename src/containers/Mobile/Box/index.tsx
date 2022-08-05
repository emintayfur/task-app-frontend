import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MobileBoxBackdrop from './Backdrop';
import { IMobileBoxProps } from './types';

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
                    className="fixed flex flex-col z-[999] bottom-0 left-0 bg-white rounded-t-[2rem] w-screen h-auto py-5 gap-5"
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{
                        y: '0',
                        opacity: 1,
                        transition: {
                            duration: 0.8,
                            type: 'tween',
                        },
                    }}
                    exit={{
                        y: '100vh',
                        opacity: 0,
                        transition: { duration: 0.7, type: 'tween' },
                    }}
                    key={`box-${id}`}
                >
                    {/** Header */}
                    <div className="flex justify-between items-center px-6 font-inter">
                        <h1 className="text-2xl font-semibold text-grey-500 px-2 py-1">
                            {title}
                        </h1>

                        {cancelButton && (
                            <button
                                className="text-grey-400 font-semibold text-sm px-2 py-1"
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
                        <div className="w-full h-auto px-6">
                            <button
                                className="w-full py-3 px-5 bg-green-500 text-white rounded-lg transition-all ease-in-out duration-300 disabled:opacity-40"
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
