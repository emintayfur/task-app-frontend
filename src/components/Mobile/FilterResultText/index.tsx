import React from 'react';
import { IResultTextProps } from './types';

const FilterResultText = (props: IResultTextProps) => {
    return (
        <div className="w-full flex justify-center font-inter font-semibold text-green-500 text-sm">
            <span>Filtrelerinize uygun {props.count} görev bulundu.</span>
        </div>
    );
};

export default FilterResultText;
