import Navigation from '@/components/navigation';
import ResponsiveNavigation from '@/components/responsive-navigation';
import ToastNotifications from '@/components/toast-notifications';
import { Head } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

export default function AppLayout({ title, children }: { title: string } & PropsWithChildren) {
    const [openNav, setOpenNav] = useState<boolean>(false);
    return (
        <>
            <Head title={title} />
            <Navigation />
            <ResponsiveNavigation open={openNav} onOpenChange={setOpenNav} />
            <main className='mx-auto min-h-screen max-w-screen-2xl'>{children}</main>
            <ToastNotifications />
        </>
    );
}
