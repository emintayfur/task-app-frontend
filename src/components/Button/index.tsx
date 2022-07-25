import React from 'react';
import styles from '../../styles/for-components/Button.module.css';
import {
    ButtonColor,
    ButtonJustify,
    ButtonSize,
    ButtonStatus,
    TButtonProps,
} from './types';

const colorClassNames: { [keys in ButtonColor]: string } = {
    [ButtonColor.default]: '',
    [ButtonColor.lightBlue]: styles.btnLightBlue,
    [ButtonColor.blue]: styles.btnBlue,
    [ButtonColor.orange]: styles.btnOrange,
    [ButtonColor.red]: styles.btnRed,
};

const sizeClassNames: { [keys in ButtonSize]: string } = {
    [ButtonSize.small]: styles.btnSmall,
    [ButtonSize.default]: '',
    [ButtonSize.large]: styles.btnLarge,
};

const justifyClassNames: { [keys in ButtonJustify]: string } = {
    [ButtonJustify.default]: '',
    [ButtonJustify.start]: styles.btnJustifyStart,
    [ButtonJustify.center]: styles.btnJustifyCenter,
    [ButtonJustify.spaceBetween]: styles.btnJustifyBetween,
    [ButtonJustify.end]: styles.btnJustifyEnd,
};

const buttonStatusClassNames: { [keys in ButtonStatus]: string } = {
    [ButtonStatus.default]: '',
    [ButtonStatus.actionDefined]: styles.btnActive,
    [ButtonStatus.disabled]: styles.btnDisabled,
};

const Button = React.forwardRef<any, TButtonProps>((props, ref) => {
    const {
        component = 'button',
        href,
        color = ButtonColor.default,
        size = ButtonSize.default,
        justify = ButtonJustify.default,
        disabled = false,
        noBg = false,
        noShadow = false,
        bold = false,
        onClick,
        className,
        title,
        children,
    } = props;

    let status: ButtonStatus = ButtonStatus.default;
    if (disabled) status = ButtonStatus.disabled;
    else if (onClick) status = ButtonStatus.actionDefined;

    const classNames: string[] = [
        styles.container,
        sizeClassNames[size],
        colorClassNames[color],
        justifyClassNames[justify],
        buttonStatusClassNames[status],
        noBg ? styles.noBg : '',
        noShadow ? styles.noShadow : '',
        bold ? styles.bold : '',
        className || '',
    ];

    const componentChildren = <>{title || children}</>;

    const componentDefaultProps = {
        ref,
        className: classNames.filter((className) => className).join(' '),
        onClick,
    };

    switch (component) {
        case 'div': {
            return (
                <div
                    aria-hidden={onClick ? 'true' : undefined}
                    {...componentDefaultProps}
                >
                    {componentChildren}
                </div>
            );
        }
        case 'a': {
            if (!href) {
                throw new Error(
                    "Button'un tipit('component' değeri) 'a' olarak gönderilmiş ancak zorunlu olan 'href' etiketi belirtilmemiş!",
                );
            }

            return (
                <a href={href} {...(componentDefaultProps as any)}>
                    {componentChildren}
                </a>
            );
        }
        case 'button':
        default: {
            return (
                <button type="button" {...componentDefaultProps}>
                    {componentChildren}
                </button>
            );
        }
    }
});

Button.displayName = 'AppButton';

export * from './types';
export default Button;
