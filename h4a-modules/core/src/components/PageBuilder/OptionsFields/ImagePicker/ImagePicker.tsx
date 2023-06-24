import React, { useCallback, useState } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';
import Image from 'next/image';
import ImageGallery from '@h4a/core/components/PageBuilder/OptionsFields/ImagePicker/ImagesGallery';
import { useTranslation } from 'react-i18next';

interface IImagePickerProps extends ISettingsComponentProps {}

const ImagePicker: React.FC<IImagePickerProps> = ({ value, id, onChange }) => {
    const [showGallery, setShowGallery] = useState(false);

    const { t } = useTranslation();

    const handleSelectFromGallery = useCallback(
        (imageData: any) => {
            onChange(imageData.url);
            setShowGallery(false);
        },
        [onChange]
    );

    const handleCloseGallery = useCallback(() => {
        setShowGallery(false);
    }, []);

    const handleClick = useCallback(() => {
        setShowGallery(true);
    }, []);

    return (
        <>
            {showGallery && (
                <ImageGallery
                    onSelectImage={handleSelectFromGallery}
                    onCloseButton={handleCloseGallery}
                />
            )}
            <div
                className={'h4a-page-builder-options-image-picker'}
                onClick={handleClick}
            >
                <div
                    className={'h4a-page-builder-options-image-picker-preview'}
                >
                    <Image src={value} alt={value} width={400} height={400} />
                </div>

                <div
                    className={'h4a-page-builder-options-image-picker-gallery'}
                >
                    {t(
                        'pageBuilder.optionsFields.core.imagePicker.openGallery'
                    )}
                </div>
            </div>
        </>
    );
};

export default ImagePicker;
