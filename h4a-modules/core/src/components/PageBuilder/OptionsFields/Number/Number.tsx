import React, { useCallback } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';

interface IUrlProps extends ISettingsComponentProps {}

const Number: React.FC<IUrlProps> = ({ value, id, onChange }) => {
    const handleChange = useCallback(
        (evt: any) => {
            onChange(parseInt(evt.target.value, 10));
        },
        [onChange]
    );

    return (
        <input
            className={'h4a-page-builder-options-number'}
            id={id}
            type="text"
            onChange={handleChange}
            value={value}
        />
    );
};

export default Number;
