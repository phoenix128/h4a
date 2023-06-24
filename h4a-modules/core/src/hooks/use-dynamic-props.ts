import replaceVariables from '@h4a/core/libs/replace-variables';
import useSerializedMemo from '@h4a/core/hooks/use-serialized-memo';
import usePageContext from '@h4a/core/hooks/use-page-context';

/**
 * Replaces variables in the props object with the values from the H4aContext
 * @param props
 */
const useDynamicProps = (props: any) => {
    const ctx = usePageContext();

    return useSerializedMemo(() => replaceVariables(props, ctx), [props, ctx]);
};

export default useDynamicProps;
