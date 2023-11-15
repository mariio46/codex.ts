import AppLayout from '@/layouts/app-layout';

export default function Home() {
    return (
        <div>
            <div className='w-full sm:px-6 lg:px-8'>
                <div className='overflow-hidden sm:rounded-lg'>
                    <div className='p-6'>Hi, You are now at Homepage</div>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <AppLayout title='home' children={page} />;
