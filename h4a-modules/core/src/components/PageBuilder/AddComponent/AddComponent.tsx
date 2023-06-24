import React, { useCallback, useContext, useMemo } from 'react';
import DropdownList from '@h4a/core/components/PageBuilder/OptionsFields/DropdownList';
import getBuilderComponentsList from '@h4a/core/libs/get-builder-components-list';
import { components } from 'react-select';
import { TemplateContext } from '@h4a/core/components/Template/Template';
import createComponent from '@h4a/core/service/create-component';
import { useTranslation } from 'react-i18next';
// @ts-ignore-next-line
import AddPlusIcon from '@h4a/core/svg/add-plus.svg';
import Image from 'next/image';
import Select, { StylesConfig } from 'react-select';
import { PageBuilderContext } from '@h4a/core/components/PageBuilder/PageBuilder';

const Option: React.FC = ({ children, ...props }: any) => {
    const { payload, label } = props.data;

    return (
        <div>
            <components.Option {...props}>
                <div>
                    <div className={'text-xs'}>{payload?.moduleName}</div>
                    <div className={'text-sm font-semibold'}>{label}</div>
                </div>
            </components.Option>
        </div>
    );
};

const AddComponent: React.FC = () => {
    const { components, setComponents } = useContext(TemplateContext);
    const { t } = useTranslation();
    const { setSelectedItem } = useContext(PageBuilderContext);

    const options = useMemo(() => {
        const res = getBuilderComponentsList();

        return res
            .map((item) => ({
                value: item.componentName,
                label: item.componentData.schema.title,
                payload: item,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const handleChange = useCallback(
        (data: any) => {
            const { value } = data;
            const newComponent = createComponent(value);
            setComponents([...components, newComponent]);
        },
        [components, setComponents]
    );

    const customStyle: StylesConfig = {
        control: (provided) => ({
            ...provided,
            zoom: '80%',
        }),
    };

    return (
        <div className={'h4a-page-builder-add-component'}>
            <Image
                src={AddPlusIcon}
                alt={t('pageBuilder.tree.core.addComponent')}
                width={20}
                height={20}
            />
            <DropdownList
                styles={customStyle}
                value={null}
                isSearchable={true}
                onChange={handleChange}
                options={options}
                components={{ Option }}
            />
        </div>
    );
};

export default AddComponent;
