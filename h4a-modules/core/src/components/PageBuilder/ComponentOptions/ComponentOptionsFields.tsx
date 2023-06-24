import React, { useCallback, useContext } from 'react';
import { PageBuilderContext } from '@h4a/core/components/PageBuilder/PageBuilder';
import { TemplateContext } from '@h4a/core/components/Template/Template';
import changeComponentValue from '@h4a/core/libs/change-component-value';
import getComponentProps from '@h4a/core/libs/get-component-props';
import useSelectedComponent from '@h4a/core/hooks/pagebuilder/use-selected-component';
import { useTranslation } from 'react-i18next';

const ComponentOptionsFields: React.FC = () => {
    const { selectedItem } = useContext(PageBuilderContext);
    const component = useSelectedComponent();
    const { components, setComponents } = useContext(TemplateContext);
    const schema = component?.schema;
    const { t } = useTranslation();

    const handleChange = useCallback(
        (propId: string, newValue: any) => {
            setComponents(
                changeComponentValue(
                    components,
                    selectedItem!.id,
                    propId,
                    newValue
                )
            );
        },
        [components, selectedItem, setComponents]
    );

    if (!schema) return null;

    return (
        <div className={'h4a-page-builder-component-options-fields'}>
            {schema.props && (
                <>
                    {Object.entries(schema.props).map(
                        ([
                            id,
                            {
                                settings,
                                title,
                                component: SettingsComponent,
                                contextVariable,
                            },
                        ]) => {
                            const value = getComponentProps(
                                components,
                                selectedItem!.id
                            );

                            const settingFieldKey = selectedItem!.id + ':' + id;

                            const handleContextVariableChange = (evt: any) => {
                                if (evt.target.checked) {
                                    handleChange(id, undefined);
                                } else {
                                    handleChange(
                                        id,
                                        schema.props![id].defaultValue || ''
                                    );
                                }
                            };

                            const hasAutoValue =
                                value?.[id] === undefined ||
                                value?.[id] === null;

                            return (
                                <div key={settingFieldKey} className={'my-3'}>
                                    <div className={'font-semibold text-sm'}>
                                        {title}
                                    </div>
                                    <SettingsComponent
                                        id={id}
                                        disabled={hasAutoValue}
                                        value={value?.[id]}
                                        onChange={(newValue) =>
                                            handleChange(id, newValue)
                                        }
                                        settings={settings}
                                    />
                                    {contextVariable && (
                                        <>
                                            <input
                                                id={settingFieldKey}
                                                type="checkbox"
                                                onChange={
                                                    handleContextVariableChange
                                                }
                                                checked={hasAutoValue}
                                            />
                                            &nbsp;
                                            <label
                                                htmlFor={settingFieldKey}
                                                className={'text-xs'}
                                            >
                                                {t(
                                                    'pageBuilder.contextVariable.' +
                                                        contextVariable
                                                )}
                                            </label>
                                        </>
                                    )}
                                </div>
                            );
                        }
                    )}
                </>
            )}
        </div>
    );
};

export default ComponentOptionsFields;
