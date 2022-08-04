import Endpoint from '../enums/Endpoint';
import { pathWithServerUrl } from '../constants/api';

export const fetchPriority = () => {
    return fetch(pathWithServerUrl(Endpoint.priorityList)).then((res) =>
        res.json(),
    );
};
fetchPriority.queryKey = ['get-priority-name'];
