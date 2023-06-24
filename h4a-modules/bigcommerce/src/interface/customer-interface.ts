export const COOKIE_CUSTOMER_PREFIX = 'bc_c_';

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ICustomerData {
    shopToken?: string;
    customerId: number;
    customerGroupId: number;
}
