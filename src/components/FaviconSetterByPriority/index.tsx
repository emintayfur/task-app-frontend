import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import Head from 'next/head';
import { pathWithServerUrl } from '../../constants/api';

const FaviconSetterByPriority = () => {
    const priority = useAppSelector((state) => state.priority);

    const activePriority = useMemo(() => {
        if (
            !(
                priority.selectedPriority &&
                priority.is.fetched &&
                Object.keys(priority.fetchedData?.obj).length &&
                priority.fetchedData.obj[priority.selectedPriority] &&
                priority.fetchedData.obj[priority.selectedPriority]
                    .faviconPath &&
                (priority.fetchedData.obj[priority.selectedPriority].faviconPath
                    ?.png ||
                    priority.fetchedData.obj[priority.selectedPriority]
                        .faviconPath?.svg)
            )
        )
            return null;

        return priority.fetchedData.obj[priority.selectedPriority];
    }, [
        priority.selectedPriority,
        priority.is.fetched,
        priority.fetchedData.obj,
    ]);

    if (!activePriority) {
        return (
            <Head>
                <link rel="icon" href="favicon.ico" />
            </Head>
        );
    }

    return (
        <Head>
            {activePriority.faviconPath?.svg && (
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={pathWithServerUrl(activePriority.faviconPath?.svg)}
                />
            )}
            {activePriority.faviconPath?.png && (
                <link
                    rel="icon"
                    type="image/png"
                    href={pathWithServerUrl(activePriority.faviconPath?.svg)}
                />
            )}
        </Head>
    );
};

export default FaviconSetterByPriority;
