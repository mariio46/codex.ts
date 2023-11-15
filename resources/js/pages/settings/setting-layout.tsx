import { Icon } from '@/components/icons';
import SideNavLink from '@/components/side-nav-link';
import { SideNavigations, SideNavigation, SideNavigationMenu } from '@/components/side-navigation';
import { PropsWithChildren } from 'react';

export default function SettingLayout({ children }: PropsWithChildren) {
    return (
        <SideNavigations>
            <SideNavigation>
                <SideNavigationMenu className='space-y-2'>
                    <SideNavLink href={route('settings.account')} active={route().current('settings.account')}>
                        <Icon name='IconUserEdit' />
                        Account
                    </SideNavLink>
                    <SideNavLink href={route('settings.security')} active={route().current('settings.security')}>
                        <Icon name='IconShieldLock' />
                        Security
                    </SideNavLink>
                    <SideNavLink href={route('settings.danger')} active={route().current('settings.danger')}>
                        <Icon name='IconAlertTriangle' />
                        Danger Area
                    </SideNavLink>
                </SideNavigationMenu>
                <div className='w-full'>
                    <div className='space-y-6'>{children}</div>
                </div>
            </SideNavigation>
        </SideNavigations>
    );
}
