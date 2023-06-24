import { useContext } from 'react';
import {
    CustomerContext,
    ICustomerContext,
} from '@h4a/bigcommerce/context/CustomerContextProvider/CustomerContextProvider';

const useCustomerContext = (): ICustomerContext => useContext(CustomerContext);

export default useCustomerContext;
