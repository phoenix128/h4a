import React, { useCallback } from 'react';
import { ISettingsComponentProps } from '@h4a/core/interface/component-interface';
import DropdownList from '@h4a/core/components/PageBuilder/OptionsFields/DropdownList';
import { useTranslation } from 'react-i18next';

interface IColumnsSizeProps extends ISettingsComponentProps {}

const Direction: React.FC<IColumnsSizeProps> = ({ value, id, onChange }) => {
    const { t } = useTranslation();

    const handleChange = useCallback(
        (data: any) => {
            onChange(data == null ? undefined : data.value);
        },
        [onChange]
    );

    const options: any[] = [
        {
            label: t('pageBuilder.optionsFields.ui.direction.vertical'),
            value: 'flex-col',
        },
        {
            label: t('pageBuilder.optionsFields.ui.direction.horizontal'),
            value: 'flex-row',
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

export default Direction;
