import React from 'react';
import {Head, Html, Main, NextScript} from "next/document";

const AppDocument = () => {
    return (
        <Html>
            <Head>
                {/** FavIcon */}
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
                <link rel="icon" type="image/svg+xml" href="favicon/blue/icon.svg" />
                <link rel="icon" type="image/png" href="favicon/blue/icon.png" />

                {/** Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Main />
            <NextScript />
        </Html>
    );
};

export default AppDocument;

