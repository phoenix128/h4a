import usePageContext from '@h4a/core/hooks/use-page-context';
import { useEffect, useState } from 'react';

const useH4aApi = <TData = any>(
    module: string,
    path: string,
    options?: RequestInit
) => {
    const [data, setData] = useState<TData | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const ctx = usePageContext();
    const url = ctx.apiBasePath + '/' + encodeURIComponent(module) + '/' + path;

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await (await fetch(url, options)).json();
                setData(res);
            } catch (e) {
                setError((e as any).message);
            } finally {
                setLoading(false);
            }
        })();
    }, [options, url]);

    return {
        loading,
        error,
        data,
    };
};

export default useH4aApi;
