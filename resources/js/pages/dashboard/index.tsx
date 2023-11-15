import AuthLayout from '@/layouts/auth-layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    return (
        <div>
            <div className='w-full sm:px-6 lg:px-8'>
                <div className='overflow-hidden sm:rounded-lg'>
                    <div className='p-6'>Hi, {auth.user.name}. You are now logged in</div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AuthLayout title='Dashboard' children={page} />;
