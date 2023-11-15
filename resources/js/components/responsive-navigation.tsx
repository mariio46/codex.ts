import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from './app-logo';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PageProps } from '@/types';
import Menu from './responsive-nav-menu';
import { Icon } from './icons';
import { ThemeToggle } from './theme-toggle';

export interface NavProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ResponsiveNavigation({ open, onOpenChange }: NavProps) {
    const { auth } = usePage<PageProps>().props;
    return (
        <nav className='z-20 mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-4 md:hidden lg:px-8 lg:py-4'>
            <Link href={route('home')}>
                <ApplicationLogo className='h-[2.2rem] w-auto bg-background' />
            </Link>

            <div className='flex items-center gap-x-2'>
                <ThemeToggle />

                {auth.user ? (
                    <Avatar className='h-[2.2rem] w-[2.2rem]' onClick={() => onOpenChange(true)}>
                        <AvatarImage src={auth.user.avatar} />
                        <AvatarFallback>{auth.user.fallback}</AvatarFallback>
                    </Avatar>
                ) : (
                    <Button variant={'outline'} size={'icon'} onClick={() => onOpenChange(true)}>
                        <Icon name='IconLayoutSidebarLeftCollapse' />
                    </Button>
                )}
            </div>

            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent className='w-[90%]' side={'right'}>
                    <SheetHeader>
                        <Link className='mb-8 block' href='/'>
                            <ApplicationLogo className='h-[2.2rem] w-auto fill-foreground' />
                        </Link>
                    </SheetHeader>
                    <Menu open={open} onOpenChange={onOpenChange} />
                </SheetContent>
            </Sheet>
        </nav>
    );
}
