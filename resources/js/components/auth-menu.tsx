import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { Tab, TabHeader, TabLink, TabSpan } from './ui/tab';

export default function AuthMenu() {
    const { auth } = usePage<PageProps>().props;
    return (
        <Tab>
            <TabHeader>
                <TabLink href={route('dashboard')} active={route().current('dashboard')}>
                    <TabSpan>Dashboard</TabSpan>
                </TabLink>
                <TabLink href={route('settings.account')} active={route().current('settings.*')}>
                    <TabSpan>Settings</TabSpan>
                </TabLink>
                {auth.user.has_roles.superadmin && (
                    <TabLink
                        href={route('roles.table')}
                        active={
                            route().current('roles.*') ||
                            route().current('permissions.*') ||
                            route().current('assignments.*')
                        }>
                        <TabSpan>Role & Permission</TabSpan>
                    </TabLink>
                )}
            </TabHeader>
        </Tab>
    );
}
