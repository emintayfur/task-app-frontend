import styles from '../../../styles/for-containers/MobileBox.module.css';
import React from 'react';
import { motion } from 'framer-motion';
import { IMobileBoxBackdropProps } from './types';
import { boxAnimateConstant } from './animate';

const MobileBoxBackdrop = (props: IMobileBoxBackdropProps) => {
    return (
        <motion.div
            key={`box-backdrop-${props.id}`}
            className={styles.backdrop}
            onClick={props.onClick}
            initial={boxAnimateConstant.backdrop.initial}
            animate={boxAnimateConstant.backdrop.animate}
            exit={boxAnimateConstant.backdrop.exit}
        />
    );
};

export default MobileBoxBackdrop;
