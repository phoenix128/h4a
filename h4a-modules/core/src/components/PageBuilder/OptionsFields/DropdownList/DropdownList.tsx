import React from 'react';
import Select, { GroupBase, Props } from 'react-select';
import { IComponentProps } from '@h4a/core/interface/component-interface';

interface IDropdownListProps<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> extends IComponentProps,
        Props<any, false, GroupBase<any>> {}

const DropdownList: React.FC<IDropdownListProps> = ({
    className = 'h4a-builder-options-dropdown',
    ...props
}) => {
    return <Select className={className} {...props} />;
};

export default DropdownList;
