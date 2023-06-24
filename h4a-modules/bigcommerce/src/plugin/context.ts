import CartContextProvider from '@h4a/bigcommerce/context/CartContextProvider';
import { IPluginContextsCollection } from '@h4a/core/interface/plugin-interface';
import CustomerContextProvider from '@h4a/bigcommerce/context/CustomerContextProvider';

const context: IPluginContextsCollection = [
    CustomerContextProvider,
    CartContextProvider,
];

export default context;
