import { useCallback, useMemo, useState } from 'react';
import { useField } from 'formik';
import { IInputFieldProps } from './types';
import styles from '../../styles/for-components/Input.module.css';
import ResizeToBigIcon from '../../assets/svg/icons/resize-toBig.svg';
import ResizeToNormalIcon from '../../assets/svg/icons/resize-toNormal.svg';

const maxLength = 255;
const InputField = (props: IInputFieldProps) => {
    const { fieldProps } = props;
    const [size, setSize] = useState<'big' | 'normal'>('normal');

    const [field, meta] = useField(fieldProps);

    const resizeIconProps = {
        viewBox: '0 0 64 64',
        width: 25,
        height: 25,
    };
    const resizeIcon = useMemo(() => {
        if (size === 'big') return ResizeToNormalIcon;
        return ResizeToBigIcon;
    }, [size]);

    const handleClickResizeIcon = useCallback(() => {
        setSize(size === 'big' ? 'normal' : 'big');
    }, [size]);

    const remainingLengthTextClassName = useMemo(() => {
        let returnedClassName: string[] = [styles.remainingCharactersLength];
        const remainingLength = maxLength - field.value?.length;
        const maxLength30 = maxLength * 0.3;

        if (field.value?.length > maxLength)
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

    return (
        <div className={styles.parent}>
            <div className={inputContainerClassName}>
                {size === 'big' && (
                    <textarea
                        minLength={0}
                        rows={3}
                        cols={3}
                        placeholder="Veritabanı bağlantısını yap ..."
                        {...field}
                    />
                )}
                {size === 'normal' && (
                    <input
                        type="text"
                        minLength={0}
                        placeholder="Veritabanı bağlantısını yap ..."
                        {...field}
                    />
                )}

                <div className={styles.actionsAndFeedbacks}>
                    <div className={remainingLengthTextClassName}>
                        {Boolean(meta.value?.length) && (
                            <span>{maxLength - field?.value?.length}</span>
                        )}
                    </div>

                    <button type="button" onClick={handleClickResizeIcon}>
                        {resizeIcon(resizeIconProps)}
                    </button>
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
