import AuthMenu from '@/components/auth-menu';
import Navigation from '@/components/navigation';
import ResponsiveNavigation from '@/components/responsive-navigation';
import ToastNotifications from '@/components/toast-notifications';
import { Head } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

export default function AuthLayout({
    title,
    children,
}: PropsWithChildren<{
    title?: string;
}>) {
    const [openNav, setOpenNav] = useState<boolean>(false);
    return (
        <>
            {title && <Head title={title} />}
            <Navigation />
            <ResponsiveNavigation open={openNav} onOpenChange={setOpenNav} />
            <AuthMenu />
            <main className='mx-auto w-full max-w-screen-2xl'>
                <div className='mx-auto px-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 xl:max-w-7xl'>
                    <h1 className='mt-8 hidden text-xl font-bold tracking-tight lg:block'>{title}</h1>
                </div>
                {children}
            </main>
            <ToastNotifications />
        </>
    );
}
