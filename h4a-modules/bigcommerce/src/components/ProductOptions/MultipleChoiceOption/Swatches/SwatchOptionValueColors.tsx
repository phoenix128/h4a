import React from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import settings from '@h4a/bigcommerce/settings';
import { SwatchOptionValue } from '@h4a/bigcommerce/generated/gql/graphql';

interface ISwatchOptionValueColorsProps extends IComponentProps {
    value: SwatchOptionValue;
}

const SwatchOptionValueColors: React.FC<ISwatchOptionValueColorsProps> = ({
    value,
    className = 'h4a-bigcommerce-swatch-option-value-colors',
}) => {
    const { hexColors } = value;
    const {
        imagesSizes: {
            swatches: { width, height },
        },
    } = settings;

    return (
        <div className={className}>
            {hexColors.map((color, idx) => (
                <div
                    key={idx}
                    className="h4a-swatch-color"
                    style={{ backgroundColor: color }}
                ></div>
            ))}
        </div>
    );
};

export default SwatchOptionValueColors;
