import useMapPath from '@h4a/core/hooks/use-map-path';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import Link from 'next/link';
import usePageUri from '@h4a/core/hooks/use-page-uri';
import isSameUrl from '@h4a/core/libs/is-same-url';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

interface IH4aLinkProps {
    path: string;
    areaMapping?: boolean;
}

/**
 * Utility class to correctly use Link with H4a area paths
 * @param props
 * @constructor
 */
const H4aLink: React.FC<PropsWithChildren<IH4aLinkProps>> = (props) => {
    const { path, children, areaMapping = true, ...otherProps } = props;
    const areaPath = useMapPath(path);
    const href = (areaMapping ? areaPath : path).replace(/^\//, '');
    const uri = usePageUri();

    useEffect(() => {
        nprogress.done();
    }, []);

    const onClick = useCallback(() => {
        if (isSameUrl(`/${href}`, uri)) {
            return;
        }

        nprogress.start();
        nprogress.configure({
            speed: 100,
        });

        setTimeout(() => {
            nprogress.done();
        }, 5000);
    }, [href, uri]);

    return (
        <>
            <Link onClick={onClick} href={`/${href}`} {...otherProps}>
                {children}
            </Link>
        </>
    );
};

export default H4aLink;
