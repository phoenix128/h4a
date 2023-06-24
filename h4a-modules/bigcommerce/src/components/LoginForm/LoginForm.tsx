'use client';

import React from 'react';
import {
    IComponentProps,
    IComponentSchema,
} from '@h4a/core/interface/component-interface';
import Section from '@h4a/ui/components/Section/Section';
import useLogin from '@h4a/bigcommerce/hooks/use-login';
import { useForm } from 'react-hook-form';
import useSerializedCallback from '@h4a/core/hooks/use-serialized-callback';
import { useTranslation } from 'react-i18next';

interface ICategoryNavProps extends IComponentProps {}

const LoginForm: React.FC<ICategoryNavProps> = ({
    className = 'h4a-bigcommerce-login-form',
}: ICategoryNavProps) => {
    const [login, { loading }] = useLogin();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = useSerializedCallback(
        async (formData: any) => {
            const { email, password } = formData;

            await login(email, password);
        },
        [login]
    );

    return (
        <Section
            className={className}
            data-h4a-component="bigcommerce/login-form"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" {...register('email')} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                    />
                </div>
                <div className="h4a-form-buttons">
                    <button disabled={loading} type="submit">
                        {t('login.login-button')}
                    </button>
                </div>
            </form>
        </Section>
    );
};

export const LoginFormSchema: IComponentSchema = {
    title: 'Login Form',
    maxChildren: 0,
};

export default LoginForm;
