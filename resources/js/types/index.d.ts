import * as icons from '@tabler/icons-react';

interface RolesCheck {
    superadmin?: boolean;
    admin?: boolean;
    operator?: boolean;
    instructor?: boolean;
    crew?: boolean;
}

export interface User {
    id: number;
    uuid: string;
    name: string;
    fallback: string;
    avatar: string;
    username: string;
    email: string;
    has_roles: RolesCheck;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface SessionFlash {
    status?: string;
    title?: string;
    message?: string;
    icon?: keyof typeof icons;
    className?: string;
}

export interface UserType {
    id: number;
    uuid: number | string;
    name: string;
    avatar?: string | undefined;
    fallback?: string | undefined;
    username: string;
    email: string;
}
