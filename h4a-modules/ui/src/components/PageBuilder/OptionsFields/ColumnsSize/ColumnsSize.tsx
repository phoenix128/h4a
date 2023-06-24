import React, { useCallback } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';
import DropdownList from '@h4a/core/components/PageBuilder/OptionsFields/DropdownList';
import { useTranslation } from 'react-i18next';

interface IColumnsSizeProps extends ISettingsComponentProps {}

const ColumnsSize: React.FC<IColumnsSizeProps> = ({ value, id, onChange }) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
        (data: any) => {
            onChange(data == null ? undefined : data.value);
        },
        [onChange]
    );

    const options: any[] = [
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-full'),
            value: 'w-full',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-1/2'),
            value: 'w-1/2',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-1/3'),
            value: 'w-1/3',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-1/4'),
            value: 'w-1/4',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-1/5'),
            value: 'w-1/5',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-1/6'),
            value: 'w-1/6',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-2/3'),
            value: 'w-2/3',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-2/5'),
            value: 'w-2/5',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-3/5'),
            value: 'w-3/5',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-3/4'),
            value: 'w-3/4',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-4/5'),
            value: 'w-4/5',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-5/6'),
            value: 'w-5/6',
        },
        {
            label: t('pageBuilder.optionsFields.ui.columnsSize.w-auto'),
            value: 'w-auto',
        },
    ];

    const selectedOption = options.find((option) => option.value === value);

    return (
        <DropdownList
            id={id}
            isSearchable={true}
            onChange={handleChange}
            options={options}
            value={selectedOption}
        />
    );
};

export default ColumnsSize;
