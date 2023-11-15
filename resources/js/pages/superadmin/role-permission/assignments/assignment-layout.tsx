import { PropsWithChildren } from 'react';
import { Menubar, MenubarContent, MenubarHeader, MenubarLink } from '@/components/menu-bar';

export default function AssignmentLayout({ children }: PropsWithChildren) {
    return (
        <Menubar>
            <MenubarHeader>
                <MenubarLink href={route('assignments.roles.table')} active={route().current('assignments.roles.*')}>
                    Roles
                </MenubarLink>
                <MenubarLink
                    href={route('assignments.permissions.table')}
                    active={route().current('assignments.permissions.*')}>
                    Permissions
                </MenubarLink>
            </MenubarHeader>
            <MenubarContent>{children}</MenubarContent>
        </Menubar>
    );
}
