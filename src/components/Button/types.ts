import type { ReactNode } from "react";

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

export interface IButtonPropDefaults {
    color?: ButtonColor;
    size?: ButtonSize;
    justify?: ButtonJustify;
    className?: string;
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