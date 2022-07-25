import React from 'react';
import styles from '../../styles/for-components/Button.module.css';
import {ButtonColor, ButtonJustify, ButtonSize, TButtonProps} from "./types";

const colorClassNames: { [keys in ButtonColor]: string } = {
    [ButtonColor.default]: '',
    [ButtonColor.lightBlue]: styles.btnLightBlue,
    [ButtonColor.blue]: styles.btnBlue,
    [ButtonColor.orange]: styles.btnOrange,
    [ButtonColor.red]: styles.btnRed,
}

const sizeClassNames: { [keys in ButtonSize]: string } = {
    [ButtonSize.small]: styles.btnSmall,
    [ButtonSize.default]: '',
    [ButtonSize.large]: styles.btnLarge,
}

const justifyClassNames: { [keys in ButtonJustify]: string } = {
    [ButtonJustify.default]: '',
    [ButtonJustify.start]: styles.btnJustifyStart,
    [ButtonJustify.center]: styles.btnJustifyCenter,
    [ButtonJustify.spaceBetween]: styles.btnJustifyBetween,
    [ButtonJustify.end]: styles.btnJustifyEnd,
}

const Button = (props: TButtonProps) => {
    const {
        color = ButtonColor.default,
        size = ButtonSize.default,
        justify = ButtonJustify.default,
        className,
        title,
        children,
    } = props;

    const classNames: string[] = [
        styles.container,
        sizeClassNames[size],
        colorClassNames[color],
        justifyClassNames[justify],
    ];

    if (className) classNames.push(className);

    return (
        <div
            aria-hidden="true"
            className={classNames.join(' ')}
        >
            {title || children}
        </div>
    );
};

export * from './types';
export default Button;
