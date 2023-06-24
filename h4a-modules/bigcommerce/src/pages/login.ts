import { IPageRouterInterface } from '@h4a/bigcommerce/interface/page-router-interface';
import getTemplateByName from '@h4a/core/libs/get-template-by-name';

const loginRouter: IPageRouterInterface = async (pageProps, context) => {
    return {
        template: await getTemplateByName('login'),
        context: {},
    };
};

export default loginRouter;
