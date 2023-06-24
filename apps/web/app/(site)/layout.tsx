import React, { PropsWithChildren } from 'react';
import '@h4a/core/generated/global.css';
import '@h4a/core/styles/builder.css';

export const revalidate = 60;
export const fetchCache = 'force-cache';

import { Raleway } from 'next/font/google';
import SessionContextProvider from '@h4a/core/context/SessionContextProvider';

// TODO: Move to UI/Core
const baseFont = Raleway({
    subsets: ['latin'],
    variable: '--font-base',
    weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
    title: 'H4A demo',
    description: 'H4A demo',
};

interface IRootLayoutProps {}

const RootLayout: React.FC<PropsWithChildren<IRootLayoutProps>> = (props) => {
    return (
        <html lang="en" className={baseFont.variable}>
            <SessionContextProvider>
                <body>{props.children}</body>
            </SessionContextProvider>
        </html>
    );
};

export default RootLayout;
