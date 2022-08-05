import React from 'react';
import { Head, Html, Main, NextScript } from 'next/document';

const AppDocument = () => {
    return (
        <Html>
            <Head>
                <meta name="theme-color" content="#DDF0DE" />

                {/** Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
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
