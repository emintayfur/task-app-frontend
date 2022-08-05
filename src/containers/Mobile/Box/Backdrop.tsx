import React from 'react';
import { motion } from 'framer-motion';
import { IMobileBoxBackdropProps } from './types';

const MobileBoxBackdrop = (props: IMobileBoxBackdropProps) => {
    return (
        <motion.div
            key={`box-backdrop-${props.id}`}
            className="fixed z-[999] w-screen h-screen top-0 left-0 bg-black"
            onClick={props.onClick}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 0.3,
                transition: { duration: 0.8, type: 'tween' },
            }}
            exit={{
                opacity: 0,
                transition: { duration: 0.4, type: 'tween' },
            }}
        />
    );
};

export default MobileBoxBackdrop;
