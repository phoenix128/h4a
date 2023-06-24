import React, { PropsWithChildren } from 'react';

export interface IRootProps {}

const Root: React.FC<PropsWithChildren<IRootProps>> = ({ children }) => {
    return <div className={'h4a-root'}>{children}</div>;
};

export default Root;
