import { useCallback, useMemo, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { useField } from 'formik';
import Tippy from '@tippyjs/react';
import { IInputFieldProps } from './types';
import styles from '../../styles/for-components/Input.module.css';

import ResizeToBigIcon from '../../assets/svg/icons/resize-toBig.svg';
import IconX from '../../assets/svg/icons/x.svg';
import IconBoltOutlined from '../../assets/svg/icons/bolt-outlined.svg';
import IconBoltFilled from '../../assets/svg/icons/bolt-filled.svg';
import Tip from '../../constants/tip';
import { useAppDispatch } from '../../store/hooks';
import { setSearchQuery } from '../../store/actions/filter';
import { TASK_TEXT_MAX_LENGTH } from '../../store/reducers/tasks';

const maxLength = TASK_TEXT_MAX_LENGTH;
const InputField = (props: IInputFieldProps) => {
    const { fieldProps } = props;
    const [isSmartInput, setIsSmartInput] = useState<boolean>(true);
    const [size, setSize] = useState<'big' | 'normal'>('normal');
    const dispatch = useAppDispatch();

    const [field, meta, helpers] = useField(fieldProps);

    const inputIconProps = useMemo(
        () => ({
            viewBox: '0 0 64 64',
            width: 25,
            height: 25,
        }),
        [],
    );
    const resizeIcon = useMemo(() => {
        if (size === 'big') return IconX;
        return ResizeToBigIcon;
    }, [size]);

    const remainingLengthTextClassName = useMemo(() => {
        let returnedClassName: string[] = [styles.remainingCharactersLength];
        const remainingLength = maxLength - field.value?.length;
        const maxLength30 = maxLength * 0.3;

        if (field.value?.length >= maxLength)
            returnedClassName.push(styles.remainingCharacterRed);
        else if (maxLength30 >= remainingLength)
            returnedClassName.push(styles.remainingCharacterOrange);

        return returnedClassName.filter((className) => className).join(' ');
    }, [field.value]);

    const inputContainerClassName = useMemo(() => {
        let returnedClassName: string[] = [styles.container];

        if (size === 'big') returnedClassName.push(styles.big);

        return returnedClassName.filter((className) => className).join(' ');
    }, [size]);

    const handleClickResizeIcon = useCallback(() => {
        setSize(size === 'big' ? 'normal' : 'big');
    }, [size]);

    const handleInputChange = useCallback<
        ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    >(
        (event) => {
            const value = event.target.value;
            helpers.setValue(value);
            helpers.setTouched(true);

            if (isSmartInput) dispatch(setSearchQuery(value));
        },
        [helpers, dispatch, isSmartInput],
    );

    const toggleSmartInput = useCallback(() => {
        let searchValue = isSmartInput ? null : field.value;

        setIsSmartInput(!isSmartInput);
        dispatch(setSearchQuery(searchValue));
    }, [dispatch, isSmartInput, field.value]);

    const defaultInputProps = {
        placeholder: Tip.input.add,
        required: true,
        minLength: 0,
        ...field,
        onChange: handleInputChange,
    };

    return (
        <div className={styles.parent}>
            <div className={inputContainerClassName}>
                {size === 'big' && (
                    <textarea rows={3} cols={3} {...defaultInputProps} />
                )}
                {size === 'normal' && (
                    <input type="text" {...defaultInputProps} />
                )}

                <div className={styles.actionsAndFeedbacks}>
                    <div className={remainingLengthTextClassName}>
                        {Boolean(meta.value?.length) && (
                            <span>{maxLength - field?.value?.length}</span>
                        )}
                    </div>

                    <Tippy
                        content={
                            size === 'big'
                                ? Tip.inputSizeIs.big
                                : Tip.inputSizeIs.normal
                        }
                    >
                        <button type="button" onClick={handleClickResizeIcon}>
                            {resizeIcon(inputIconProps)}
                        </button>
                    </Tippy>
                    <Tippy
                        content={
                            isSmartInput
                                ? Tip.smartInputIs.active
                                : Tip.smartInputIs.deActive
                        }
                    >
                        <button type="button" onClick={toggleSmartInput}>
                            {isSmartInput && (
                                <IconBoltFilled {...inputIconProps} />
                            )}
                            {!isSmartInput && (
                                <IconBoltOutlined {...inputIconProps} />
                            )}
                        </button>
                    </Tippy>
                </div>
            </div>
            {size === 'big' && (
                <div
                    className={styles.back}
                    onClick={() => {
                        setSize('normal');
                    }}
                />
            )}
        </div>
    );
};

export default InputField;
