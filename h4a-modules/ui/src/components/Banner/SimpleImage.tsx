import React from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import clsx from 'clsx';
import Image from 'next/image';
import Number from '@h4a/core/components/PageBuilder/OptionsFields/Number';
import Text from '@h4a/core/components/PageBuilder/OptionsFields/Text';
import ImagePicker from '@h4a/core/components/PageBuilder/OptionsFields/ImagePicker';
import Range from '@h4a/core/components/PageBuilder/OptionsFields/Range';

interface ISimpleImageProps extends IComponentProps {
    imageUrl: string;
    title: string;
    linkUrl?: string;
    width: number;
    height: number;
    quality?: number;
}

const SimpleImage: React.FC<ISimpleImageProps> = ({
    className = 'h4a-ui-image',
    imageUrl = BannerSchema.props!.imageUrl.defaultValue,
    title,
    linkUrl,
    width = BannerSchema.props!.width.defaultValue,
    height = BannerSchema.props!.height.defaultValue,
    quality = BannerSchema.props!.quality.defaultValue,
}) => {
    return (
        <div data-h4a-component="ui/banner" className={clsx(className)}>
            {linkUrl && (
                <a href={linkUrl}>
                    <Image
                        className={'w-full'}
                        width={width}
                        height={height}
                        src={imageUrl}
                        alt={title}
                        quality={quality}
                    />
                </a>
            )}
            {!linkUrl && (
                <Image
                    className={'w-full'}
                    width={width}
                    height={height}
                    src={imageUrl}
                    alt={title}
                    quality={quality}
                />
            )}
        </div>
    );
};

export const BannerSchema: IComponentSchema = {
    title: 'Image',
    maxChildren: 0,
    props: {
        imageUrl: {
            title: 'Image',
            component: ImagePicker,
            defaultValue: 'https://picsum.photos/id/58/800/100.jpg',
        },
        linkUrl: {
            title: 'Link URL',
            component: Text,
        },
        title: {
            title: 'Image Alt Text',
            component: Text,
        },
        width: {
            title: 'Image Width',
            component: Number,
            defaultValue: 800,
        },
        height: {
            title: 'Image Height',
            component: Number,
            defaultValue: 100,
        },
        quality: {
            title: 'Quality',
            component: Range,
            defaultValue: 75,
            settings: {
                min: 1,
                max: 100,
            },
        },
    },
};

export default SimpleImage;
