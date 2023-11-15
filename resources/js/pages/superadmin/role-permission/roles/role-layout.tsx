import { PropsWithChildren } from 'react';
import { Menubar, MenubarContent, MenubarHeader, MenubarLink } from '@/components/menu-bar';

export default function RoleLayout({ children }: PropsWithChildren) {
    return (
        <Menubar>
            <MenubarHeader>
                <MenubarLink href={route('roles.table')} active={route().current('roles.table')}>
                    Table
                </MenubarLink>
                <MenubarLink
                    href={route('roles.create')}
                    active={route().current('roles.create') || route().current('roles.edit')}>
                    Form
                </MenubarLink>
            </MenubarHeader>
            <MenubarContent>{children}</MenubarContent>
        </Menubar>
    );
}
