import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import Board from '../../constants/board';
import Head from 'next/head';

const FaviconSetterByPriority = () => {
    const priority = useAppSelector((state) => state.priority);

    const activePriority = useMemo(() => {
        return Board[priority];
    }, [priority]);

    return (
        <Head>
            {activePriority.faviconPath?.svg && (
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={activePriority.faviconPath?.svg}
                />
            )}
            {activePriority.faviconPath?.png && (
                <link
                    rel="icon"
                    type="image/png"
                    href={activePriority.faviconPath?.png}
                />
            )}
        </Head>
    );
};

export default FaviconSetterByPriority;
