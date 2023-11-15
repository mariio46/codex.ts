import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from './app-logo';
import { Icon } from './icons';
import NavLink from './nav-link';
import NavigationDropdown from './navigation-dropdown';
import { ThemeToggle } from './theme-toggle';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

export default function Navigation() {
    const { auth } = usePage<PageProps>().props;
    return (
        <nav className='relative z-20 mx-auto hidden max-w-screen-2xl items-center justify-between px-4 py-3 md:flex lg:px-8 lg:py-4'>
            <Link href={route('home')}>
                <ApplicationLogo className='h-10 w-auto bg-background sm:h-12' />
            </Link>
            <div>
                <div className='flex items-center'>
                    <ul className='flex items-center gap-x-2'>
                        <NavLink href={route('home')} active={route().current('home')}>
                            Home
                        </NavLink>
                    </ul>
                    <Separator orientation='vertical' className='ml-6 mr-4 h-8 w-[1px] shrink-0 bg-slate-500/20' />

                    <div className='flex items-center gap-x-4'>
                        <Button variant={'ghost'} size={'icon'} className='rounded-full'>
                            <Icon name='IconSearch' />
                            <span className='sr-only'>Pencarian cepat...</span>
                        </Button>
                        {auth.user ? (
                            <NavigationDropdown {...{ auth }} />
                        ) : (
                            <>
                                <ThemeToggle className='h-[2.5rem] w-[2.5rem]' />
                                <Link
                                    className={buttonVariants({
                                        variant: 'outline',
                                        className: 'h-[2.5rem] px-4',
                                    })}
                                    href={route('login')}>
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
