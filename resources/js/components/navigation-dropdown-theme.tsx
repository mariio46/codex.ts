'use client';

import { Icon } from './icons';
import { useTheme } from './theme-provider';
import {
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from './ui/dropdown-menu';

export default function NavigationDropdownTheme() {
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
    );
}
