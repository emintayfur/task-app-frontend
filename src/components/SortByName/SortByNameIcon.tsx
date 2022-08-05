import React from 'react';
import { motion } from 'framer-motion';

const MOVE = 6;

export interface ISortByNameIconProps {
    value: number;
}
const SortByNameIcon = (props: ISortByNameIconProps) => {
    const { value } = props;
    return (
        <svg
            width={40}
            height={40}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
        >
            <motion.path
                d="M37 14V48.5754C37 49.5751 38.3049 49.9561 38.8429 49.1135L49 33.2043"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                animate={{ y: -(value * MOVE) }}
            />
            <motion.path
                d="M28 50L28 15.4246C28 14.4249 26.6951 14.0439 26.1571 14.8865L16 30.7957"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                animate={{ y: value * MOVE }}
            />
        </svg>
    );
};

export default SortByNameIcon;
