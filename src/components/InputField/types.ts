import type { FieldHookConfig } from 'formik';

export interface IInputFieldProps {
    disabled?: boolean;
    fieldProps: FieldHookConfig<any>;
}
