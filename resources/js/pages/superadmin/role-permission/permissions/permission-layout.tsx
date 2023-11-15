import { PropsWithChildren } from 'react';
import { Menubar, MenubarContent, MenubarHeader, MenubarLink } from '@/components/menu-bar';

export default function PermissionLayout({ children }: PropsWithChildren) {
    return (
        <Menubar>
            <MenubarHeader>
                <MenubarLink href={route('permissions.table')} active={route().current('permissions.table')}>
                    Table
                </MenubarLink>
                <MenubarLink
                    href={route('permissions.create')}
                    active={route().current('permissions.create') || route().current('permissions.edit')}>
                    Form
                </MenubarLink>
            </MenubarHeader>
            <MenubarContent>{children}</MenubarContent>
        </Menubar>
    );
}
