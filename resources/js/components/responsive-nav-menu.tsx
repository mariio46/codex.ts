import { Separator } from '@/components/ui/separator';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import ResponsiveNavLink from './responsive-nav-link';
import { NavProps } from './responsive-navigation';

export default function Menu({ open, onOpenChange }: NavProps) {
    const { auth } = usePage<PageProps>().props;
    console.log(open);
    const CloseNav = () => {
        onOpenChange(false);
    };
    return (
        <ul className='flex flex-col gap-y-1'>
            {!route().current('home') && (
                <ResponsiveNavLink
                    active={route().current('home')}
                    href={route('home')}
                    icon='IconHome2'
                    onSuccess={CloseNav}>
                    Home
                </ResponsiveNavLink>
            )}
            {auth.user ? (
                <>
                    <ResponsiveNavLink
                        active={route().current('dashboard')}
                        href={route('dashboard')}
                        icon='IconDashboard'
                        onSuccess={CloseNav}>
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        active={route().current('settings.*')}
                        href={route('settings.account')}
                        icon='IconSettings'
                        onSuccess={CloseNav}>
                        Settings
                    </ResponsiveNavLink>
                    {auth.user.has_roles.superadmin && (
                        <>
                            <ResponsiveNavLink
                                active={
                                    route().current('roles.*') ||
                                    route().current('permissions.*') ||
                                    route().current('assignments.*')
                                }
                                href={route('roles.table')}
                                icon='IconIdBadge'
                                onSuccess={CloseNav}>
                                Role & Permission
                            </ResponsiveNavLink>
                        </>
                    )}
                    <Separator className='my-2' />
                    <ResponsiveNavLink
                        as='button'
                        method='post'
                        href={route('logout')}
                        icon='IconLogout2'
                        onSuccess={CloseNav}>
                        Logout
                    </ResponsiveNavLink>
                </>
            ) : (
                <>
                    <ResponsiveNavLink href={route('login')} icon='IconLogin2' onSuccess={CloseNav}>
                        Login
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('register')} icon='IconUserPlus' onSuccess={CloseNav}>
                        Register
                    </ResponsiveNavLink>
                </>
            )}
        </ul>
    );
}
