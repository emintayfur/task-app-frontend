import Endpoint from '../enums/Endpoint';
import { pathWithServerUrl } from '../constants/api';

export const fetchPriority = (isPrefetch?: boolean) => () => {
    let url = pathWithServerUrl(Endpoint.priorityList);
    if (isPrefetch) url += '?isPrefetch=1';

    return fetch(url).then((res) => res.json());
};
fetchPriority.queryKey = (isPrefetch = false) => [
    'get-priority-name',
    isPrefetch,
];
