import { Icon } from '@/components/icons';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({
    title,
    description,
    children,
}: PropsWithChildren<{
    title: string;
    description?: string;
}>) {
    const { theme, setTheme } = useTheme();
    const changeTheme = () => (theme === 'light' ? setTheme('dark') : setTheme('light'));

    return (
        <>
            <Head title={title} />
            <div className='absolute bottom-2 right-2'>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className='h-[2.6rem] w-[2.6rem] rounded-lg'
                    onClick={changeTheme}>
                    <Icon name={theme === 'light' ? 'IconSunLow' : 'IconMoon'} />
                </Button>
            </div>
            <div className='flex min-h-screen flex-col items-center sm:justify-center'>
                <div className='mt-6 w-full shadow sm:max-w-md'>
                    <Card className='rounded-none md:rounded-xl'>
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent>{children}</CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
