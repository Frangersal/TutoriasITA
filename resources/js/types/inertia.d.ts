import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface PageProps extends InertiaPageProps {
    auth: {
        user: AuthUser | null;
    };
    name: string;
    quote: {
        message: string;
        author: string;
    };
    sidebarOpen: boolean;
}
