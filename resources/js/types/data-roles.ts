import { PageProps } from '.';

interface MetaLinksType {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created: string;
    updated: string;
}

export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLinksType[];
    path: string;
    per_page: number;
    to: number;
    total: number;
    has_pages: boolean;
}

export interface DataRoles extends PageProps {
    roles: {
        data: Role[];
        links: Links;
        meta: Meta;
    };
}
