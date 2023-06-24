'use client';

import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from 'react';
import { COOKIE_CUSTOMER_PREFIX } from '@h4a/bigcommerce/interface/customer-interface';
import usePageContext from '@h4a/core/hooks/use-page-context';
import jwt from 'jsonwebtoken';

export interface ICustomerContext {
    setCustomer: (customer: any) => void;
    customer?: any;
}

interface ICustomerContextProviderProps {}

export const CustomerContext = createContext<ICustomerContext>(
    {} as ICustomerContext
);

const CustomerContextProvider = ({
    children,
}: PropsWithChildren<ICustomerContextProviderProps>) => {
    const [customer, setCustomer] = useState<any>(null);

    useEffect(() => {
        // TODO: Read customer from cookie
    }, []);

    return (
        <CustomerContext.Provider
            value={{
                setCustomer,
                customer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};

export default CustomerContextProvider;
