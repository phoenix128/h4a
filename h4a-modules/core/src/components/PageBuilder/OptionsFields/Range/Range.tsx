import React, { useCallback, useState } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';
import Slider from 'react-input-slider';

interface IProps {
    min?: number;
    max?: number;
    step?: number;
}

const Range: React.FC<ISettingsComponentProps<IProps>> = ({
    value: initialValue,
    onChange,
    settings: { min = 0, max = 10, step = 1 },
}) => {
    const [value, setValue] = useState({ x: initialValue || min });
    const { x } = value;

    const handleChange = useCallback(
        (data: any) => {
            setValue(data);
            onChange(data.x);
        },
        [onChange]
    );

    return (
        <div className={'flex flex-row items-center'}>
            <Slider
                xmin={min}
                xmax={max}
                xstep={step}
                axis="x"
                x={x}
                onChange={handleChange}
            />
            <div className="text-center ml-4 text-sm">{x}</div>
        </div>
    );
};

export default Range;
