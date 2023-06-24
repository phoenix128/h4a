import React, { useCallback, useContext } from 'react';
import { PageBuilderContext } from '@h4a/core/components/PageBuilder/PageBuilder';
import { TemplateContext } from '@h4a/core/components/Template/Template';
import { useTranslation } from 'react-i18next';
import useSelectedComponent from '@h4a/core/hooks/pagebuilder/use-selected-component';
import removeComponent from '@h4a/core/service/page-builder/remove-component';

const ComponentActions: React.FC = () => {
    const { selectedItem } = useContext(PageBuilderContext);
    const { components, setComponents } = useContext(TemplateContext);
    const { t } = useTranslation();
    const component = useSelectedComponent();
    const schema = component?.schema;

    const handleDelete = useCallback(() => {
        const res = confirm(
            t('pageBuilder.componentActions.core.confirmDelete') || ''
        );

        if (res) {
            setComponents(removeComponent(components, selectedItem!.id));
        }
    }, [components, selectedItem, setComponents, t]);

    if (!schema) return null;

    return (
        <div className={'h4a-page-builder-component-actions'}>
            <button
                className={'h4a-page-builder-component-actions-button-delete'}
                onClick={handleDelete}
            >
                {t('pageBuilder.componentActions.core.deleteComponent')}
            </button>
        </div>
    );
};

export default ComponentActions;
