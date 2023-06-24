import React, { useCallback } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';

interface IUrlProps extends ISettingsComponentProps {}

const Text: React.FC<IUrlProps> = ({ value, id, onChange }) => {
    const handleChange = useCallback(
        (evt: any) => {
            onChange(evt.target.value);
        },
        [onChange]
    );

    return (
        <input
            className={'h4a-page-builder-options-text'}
            id={id}
            type="text"
            onChange={handleChange}
            value={value}
        />
    );
};

export default Text;
