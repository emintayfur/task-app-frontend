import type {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    MouseEventHandler,
    ReactNode,
} from 'react';

export enum ButtonColor {
    default,
    lightBlue,
    blue,
    orange,
    red,
}

export enum ButtonSize {
    small,
    default,
    large,
}

export enum ButtonJustify {
    default,
    start,
    center,
    spaceBetween,
    end,
}

export enum ButtonStatus {
    default,
    actionDefined,
    disabled,
}

export interface IButtonPropDefaults
    extends Omit<
        DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        'color' | 'className' | 'onClick' | 'ref'
    > {
    color?: ButtonColor;
    size?: ButtonSize;
    justify?: ButtonJustify;
    className?: string;
    component?: 'div' | 'button' | 'a';
    href?: string;
    onClick?: MouseEventHandler<
        HTMLDivElement | HTMLButtonElement | HTMLLinkElement
    >;
    noBg?: boolean;
    noShadow?: boolean;
    bold?: boolean;
}

export interface IButtonPropsWithTitle extends IButtonPropDefaults {
    title: string;
    children?: never;
}

export interface IButtonPropsWithChildren extends IButtonPropDefaults {
    children: ReactNode | ReactNode[];
    title?: never;
}

export type TButtonProps = IButtonPropsWithTitle | IButtonPropsWithChildren;
