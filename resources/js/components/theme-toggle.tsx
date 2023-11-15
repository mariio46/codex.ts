import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Icon } from './icons';

const Menu = [
    {
        label: 'Light',
        action: 'light',
    },
    {
        label: 'Dark',
        action: 'dark',
    },
    {
        label: 'System',
        action: 'system',
    },
];

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const IconName =
        theme === 'light'
            ? 'IconSunLow'
            : theme === 'dark'
            ? 'IconMoon'
            : theme === 'system'
            ? 'IconDeviceDesktop'
            : 'IconSunLow';
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className={cn('h-[2.3rem] w-[2.3rem] rounded-lg', className)}>
                    <Icon name={IconName} />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {Menu.map((item: any, i: number) => (
                    <DropdownMenuItem key={i} onClick={() => setTheme(item.action)} className='justify-between'>
                        {item.label}
                        {theme === item.action && <Icon name='IconCheck' className='h-4 w-4 stroke-2' />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
