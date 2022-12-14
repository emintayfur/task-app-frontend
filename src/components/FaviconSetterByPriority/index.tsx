import React, { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import Head from 'next/head';
import { pathWithServerUrl } from '../../constants/api';
import useMobileViewController from '../../hooks/useMobileViewController';
import { useRouter } from 'next/router';
import Route from '../../enums/Route';

const FaviconSetterByPriority = () => {
    const router = useRouter();
    const priority = useAppSelector((state) => state.priority);
    const isMobile = useMobileViewController();

    const activePriority = useMemo(() => {
        if (
            isMobile ||
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
        isMobile,
    ]);

    const blueIcons = useMemo(
        () => (
            <>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon/blue/icon.svg"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon/blue/icon.png"
                />
            </>
        ),
        [],
    );

    const redIcons = useMemo(
        () => (
            <>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon/red/icon.svg"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/favicon/red/icon.png"
                />
            </>
        ),
        [],
    );

    const userInLandingPage = useMemo(() => {
        return router.pathname === Route.landingPage;
    }, [router]);

    if (isMobile && !activePriority) {
        return (
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png?v=0.1"
                />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg?v=0.1"
                    color="#5bbad5"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="shortcut icon" href="/favicon.ico?v=0.1" />
                <meta name="apple-mobile-web-app-title" content="RiseQ" />
                <meta name="application-name" content="RiseQ" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#DDF0DE" />
            </Head>
        );
    }

    if (!isMobile) {
        return (
            <Head>
                {!userInLandingPage && priority.is.loading && redIcons}
                {!userInLandingPage &&
                    !priority.is.loading &&
                    !priority.is.fetched &&
                    blueIcons}
                {userInLandingPage && blueIcons}
            </Head>
        );
    }

    if (!activePriority) return <></>;
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
