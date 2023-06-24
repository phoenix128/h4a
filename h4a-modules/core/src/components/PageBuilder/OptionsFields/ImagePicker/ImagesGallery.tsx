import React, { useCallback, useState } from 'react';
import useH4aApi from '@h4a/core/hooks/use-h4a-api';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
// @ts-ignore-next-line
import CloseIcon from '@h4a/core/svg/close.svg';
// @ts-ignore-next-line
import UploadIcon from '@h4a/core/svg/upload.svg';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import MoonLoader from 'react-spinners/MoonLoader';

interface IImageGalleryProps {
    onSelectImage: (imageData: any) => void;
    onCloseButton: () => void;
}

const ImageGallery: React.FC<IImageGalleryProps> = ({
    onSelectImage,
    onCloseButton,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const gallery = useH4aApi('@h4a/core', 'pagebuilder/list-images');
    const { t } = useTranslation();

    const handleDrop = useCallback(
        async (acceptedFiles: any) => {
            try {
                const formData = new FormData();
                formData.append('file', acceptedFiles[0]);

                setIsLoading(true);

                const res = await axios.post(
                    '/api/%40h4a%2Fcore/pagebuilder/upload-image',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                setIsLoading(false);

                onSelectImage({ url: res.data.url });
            } catch (error) {
                alert(error);
            }
        },
        [onSelectImage]
    );

    const searchFilter = (imageData: any) => {
        if (searchText === '') {
            return true;
        }

        return imageData.url.includes(searchText);
    };

    return (
        <div className={'h4a-page-builder-options-image-gallery'}>
            <div className={'h4a-page-builder-options-image-gallery-modal'}>
                <div
                    className={'h4a-page-builder-options-image-gallery-header'}
                >
                    <h2>
                        {t(
                            'pageBuilder.optionsFields.core.imagePicker.gallery'
                        )}
                    </h2>
                    <div
                        className={
                            'h4a-page-builder-options-image-gallery-close'
                        }
                        onClick={onCloseButton}
                    >
                        <Image src={CloseIcon} alt={'close'} />
                    </div>
                </div>
                <div
                    className={
                        'h4a-page-builder-options-image-gallery-drop-zone'
                    }
                >
                    {isLoading && <MoonLoader />}
                    {!isLoading && (
                        <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div
                                            className={
                                                'h4a-page-builder-options-image-picker-drop-zone'
                                            }
                                        >
                                            <Image
                                                src={UploadIcon}
                                                alt={''}
                                                width={40}
                                                height={40}
                                            />
                                            {t(
                                                'pageBuilder.optionsFields.core.imagePicker.dragAndDrop'
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    )}
                </div>
                <div
                    className={'h4a-page-builder-options-image-gallery-search'}
                >
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        placeholder={
                            t(
                                'pageBuilder.optionsFields.core.imagePicker.searchText'
                            ) || ''
                        }
                    />
                </div>
                <div className={'h4a-page-builder-options-image-gallery-inner'}>
                    {gallery.loading && (
                        <div
                            className={
                                'h4a-page-builder-options-image-gallery-loading'
                            }
                        >
                            <MoonLoader />
                        </div>
                    )}

                    <ul
                        className={
                            'h4a-page-builder-options-image-gallery-items-list'
                        }
                    >
                        {gallery.data
                            ?.filter(searchFilter)
                            .map((imageData: any) => {
                                return (
                                    <li
                                        key={imageData.url}
                                        className={
                                            'h4a-page-builder-options-image-gallery-item'
                                        }
                                    >
                                        <div
                                            onClick={() =>
                                                onSelectImage(imageData)
                                            }
                                            className={
                                                'h4a-page-builder-options-image-gallery-item-inner'
                                            }
                                        >
                                            <Image
                                                src={imageData.url}
                                                alt={imageData.url}
                                                width={300}
                                                height={300}
                                            />

                                            <div
                                                className={
                                                    'h4a-page-builder-options-image-gallery-item-choose-btn'
                                                }
                                            >
                                                {t(
                                                    'pageBuilder.optionsFields.core.imagePicker.choose'
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                'h4a-page-builder-options-image-gallery-item-name'
                                            }
                                        >
                                            {imageData.name}
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
