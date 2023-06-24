import React from 'react';
import { IComponentProps } from '@h4a/core/interface/component-interface';
import { SwatchOptionValue } from '@h4a/bigcommerce/generated/gql/graphql';
import settings from '@h4a/bigcommerce/settings';
import Image from 'next/image';

interface ISwatchOptionValueImageProps extends IComponentProps {
    value: SwatchOptionValue;
}

const SwatchOptionValueImage: React.FC<ISwatchOptionValueImageProps> = ({
    value,
    className = 'h4a-bigcommerce-swatch-option-value-image',
}) => {
    const { imageUrl } = value;
    const {
        imagesSizes: {
            swatches: { width, height },
        },
    } = settings;

    return (
        <div className={className}>
            <Image
                className="h4a-swatch-image"
                width={width}
                height={height}
                src={imageUrl!}
                alt={value.label}
            />
        </div>
    );
};

export default SwatchOptionValueImage;
