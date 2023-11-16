import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Icon } from '@/components/icons';
import {
    Profile,
    ProfileAdditional,
    ProfileAvatar,
    ProfileContent,
    ProfileFallback,
    ProfileHeader,
    ProfileImage,
    ProfileName,
} from '@/components/profile-block';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { PageProps, UserType } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { useTheme } from '@/components/theme-provider';

function ProfileBlockChat({
    avatar,
    fallback,
    name,
    username,
}: {
    avatar?: string;
    fallback?: string;
    name?: string;
    username?: string;
}) {
    return (
        <Profile>
            <ProfileHeader>
                <ProfileAvatar>
                    <ProfileImage src={avatar} />
                    <ProfileFallback>{fallback}</ProfileFallback>
                </ProfileAvatar>
            </ProfileHeader>
            <ProfileContent>
                <ProfileName>{name}</ProfileName>
                <ProfileAdditional>{username}</ProfileAdditional>
            </ProfileContent>
        </Profile>
    );
}

function DropdownMenuChat() {
    const { auth } = usePage<PageProps>().props;
    const { theme, setTheme } = useTheme();
    const setName =
        theme === 'light'
            ? 'IconSunLow'
            : theme === 'dark'
            ? 'IconMoon'
            : theme === 'system'
            ? 'IconDeviceDesktop'
            : 'IconSunLow';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Icon name='IconDotsVertical' className='h-[1.15rem] w-[1.15rem]' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='mt-2 w-[200px] space-y-1'>
                <DropdownMenuLabel>
                    <ProfileBlockChat
                        avatar={auth.user.avatar}
                        fallback={auth.user.fallback}
                        name={auth.user.name}
                        username={auth.user.username}
                    />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={route('dashboard')}>
                            <Icon name='IconDashboard' className='mr-2' />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('settings.account')}>
                            <Icon name='IconSettings' className='mr-2' />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Icon name={setName} className='mr-2' />
                            <span className='capitalize'>Themes / {theme}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className='mr-1 w-52'>
                                <DropdownMenuCheckboxItem
                                    checked={theme === 'light' && true}
                                    onCheckedChange={() => setTheme('light')}>
                                    <Icon name='IconSunLow' className='mr-2' />
                                    Light
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={theme === 'dark' && true}
                                    onCheckedChange={() => setTheme('dark')}>
                                    <Icon name='IconMoon' className='mr-2' />
                                    Dark
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={theme === 'system' && true}
                                    onCheckedChange={() => setTheme('system')}>
                                    <Icon name='IconDeviceDesktop' className='mr-2' />
                                    System
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.post(route('logout'))}>
                        <Icon name='IconLogout2' className='mr-2' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function ChatLayout({
    children,
    title = 'Chats',
}: PropsWithChildren<{
    title?: string;
}>) {
    const { users } = usePage<{ users: UserType[] }>().props;
    return (
        <div className='flex'>
            <Head title={title} />
            <nav className='w-1/4'>
                <div className='simple-scrollbar fixed flex h-full w-1/4 flex-col border-r'>
                    <div className='flex items-center justify-between px-5 py-5'>
                        <h1 className='text-xl font-bold'>Chats</h1>
                        <DropdownMenuChat />
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        {users.map((user: UserType, i: number) => (
                            <Link
                                key={i}
                                href={route('chats.show', [user])}
                                className={cn(
                                    'mb-1 block space-y-1 px-5 py-4 hover:bg-accent',
                                    route().current('chats.show', [user]) && 'bg-accent',
                                )}>
                                <ProfileBlockChat
                                    avatar={user.avatar}
                                    fallback={user.fallback}
                                    name={user.name}
                                    username={user.username}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            <main className='w-3/4'>{children}</main>
            <Toaster />
        </div>
    );
}
