import { TaskElem } from '../../store/reducers/tasks';

export interface IDashboardGlobalProps {
    tasks: TaskElem[];
    totalItemCount: number;
}

export interface IDashboardDesktopProps extends IDashboardGlobalProps {}
export interface IDashboardMobileProps extends IDashboardGlobalProps {}
