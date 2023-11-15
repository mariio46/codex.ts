import { Icon } from '@/components/icons';
import SideNavLink from '@/components/side-nav-link';
import { SideNavigations, SideNavigation, SideNavigationMenu } from '@/components/side-navigation';
import { PropsWithChildren } from 'react';

export default function RolePermissionLayout({ children }: PropsWithChildren) {
    return (
        <SideNavigations>
            <SideNavigation>
                <SideNavigationMenu className='space-y-2'>
                    <SideNavLink href={route('roles.table')} active={route().current('roles.*')}>
                        <Icon name='IconUserCheck' />
                        Roles
                    </SideNavLink>
                    <SideNavLink href={route('permissions.table')} active={route().current('permissions.*')}>
                        <Icon name='IconLicense' />
                        Permissions
                    </SideNavLink>
                    <SideNavLink href={route('assignments.roles.table')} active={route().current('assignments.*')}>
                        <Icon name='IconCertificate' />
                        Assignments
                    </SideNavLink>
                </SideNavigationMenu>
                <div className='w-full'>
                    <div className='space-y-6'>{children}</div>
                </div>
            </SideNavigation>
        </SideNavigations>
    );
}
