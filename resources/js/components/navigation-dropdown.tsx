import { PageProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Icon } from './icons';
import {
    Profile,
    ProfileAdditional,
    ProfileAvatar,
    ProfileContent,
    ProfileFallback,
    ProfileHeader,
    ProfileImage,
    ProfileName,
} from './profile-block';
import { useTheme } from './theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
} from './ui/dropdown-menu';

export default function NavigationDropdown({ auth }: PageProps) {
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
            <DropdownMenuTrigger className='relative select-none outline-none'>
                <Avatar className='h-[2.7rem] w-[2.7rem]'>
                    <AvatarImage src={auth.user.avatar} />
                    <AvatarFallback>{auth.user.fallback}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='mt-2 w-[260px] space-y-1'>
                <DropdownMenuLabel>
                    <Profile>
                        <ProfileHeader>
                            <ProfileAvatar>
                                <ProfileImage src={auth.user.avatar} />
                                <ProfileFallback>{auth.user.fallback}</ProfileFallback>
                            </ProfileAvatar>
                        </ProfileHeader>
                        <ProfileContent>
                            <ProfileName>{auth.user.name}</ProfileName>
                            <ProfileAdditional>{auth.user.email}</ProfileAdditional>
                        </ProfileContent>
                    </Profile>
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
