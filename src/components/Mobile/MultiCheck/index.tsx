import React, { useCallback } from 'react';
import { IMultiCheckProps } from './types';

const MultiCheck = (props: IMultiCheckProps) => {
    const { value: valueInProps, options, onChange } = props;

    const handleToggleCheckbox = useCallback(
        (value: string) => () => {
            const isChecked = valueInProps.includes(value);
            let newValue = [];

            if (isChecked)
                newValue = valueInProps.filter(
                    (selectedValue: string) => selectedValue !== value,
                );
            else newValue = [...valueInProps, value];

            onChange(newValue);
        },
        [valueInProps, onChange],
    );

    const setOneValue = useCallback(
        (value: string) => () => {
            onChange([value]);
        },
        [onChange],
    );

    return (
        <div className="flex flex-col gap-5 font-inter font-medium">
            {options.map((item, itemIdx) => {
                const isActive = valueInProps.includes(item.value);
                const onlySelectedThis =
                    valueInProps.length === 1 &&
                    valueInProps.includes(item.value);

                return (
                    <div
                        className="flex justify-between items-center"
                        key={`multi_check_item_${item.value}_${itemIdx}`}
                    >
                        <button className="text-grey-500">
                            <span>{item.name}</span>
                        </button>

                        <div className="flex gap-5 justify-center items-center">
                            <button
                                disabled={onlySelectedThis}
                                className="text-green-500 text-xs transition-all font-medium ease-in-out duration-300 opacity-100 disabled:opacity-50"
                                onClick={setOneValue(item.value)}
                            >
                                <span>Sadece</span>
                            </button>
                            <button
                                type="button"
                                className={`w-6 h-6 rounded border-2 border-green-500 transition-all ease-in-out duration-300 ${
                                    isActive ? 'bg-green-500' : 'bg-transparent'
                                }`}
                                onClick={handleToggleCheckbox(item.value)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MultiCheck;
