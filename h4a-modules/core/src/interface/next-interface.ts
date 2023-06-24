export interface INextPageRouterProps {
    params: {
        path: string[];
    };
    searchParams: ISearchParams;
}

export interface INextApiRouterProps {
    params: {
        path: string[];
    };
    searchParams: ISearchParams;
}

export type ISearchParams = Record<string, string | string[]>;
