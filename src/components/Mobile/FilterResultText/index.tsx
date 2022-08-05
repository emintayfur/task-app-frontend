import styles from '../../../styles/for-components/FilterResultText.module.css';
import React from 'react';
import { IResultTextProps } from './types';

const FilterResultText = (props: IResultTextProps) => {
    return (
        <div className={styles.container}>
            <span>Filtrelerinize uygun {props.count} görev bulundu.</span>
        </div>
    );
};

export default FilterResultText;
