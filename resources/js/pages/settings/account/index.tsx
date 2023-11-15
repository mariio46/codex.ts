import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SettingLayout from '../setting-layout';

export default function UpdateAccount({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, put, errors, processing } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('settings.account'));
    };

    return (
        <Card className='max-w-2xl'>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account's profile information and email address.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className='space-y-4'>
                    <div>
                        <Label htmlFor='name'>Name</Label>

                        <Input
                            id='name'
                            className='mt-1 block w-full'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                            autoComplete='name'
                        />

                        <InputError className='mt-2' message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor='username'>Username</Label>

                        <Input
                            id='username'
                            className='mt-1 block w-full'
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            autoComplete='username'
                        />

                        <InputError className='mt-2' message={errors.username} />
                    </div>

                    <div>
                        <Label htmlFor='email'>Email</Label>

                        <Input
                            id='email'
                            type='email'
                            className='mt-1 block w-full'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete='username'
                        />

                        <InputError className='mt-2' message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className='mt-2 text-sm text-gray-800'>
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method='post'
                                    as='button'
                                    className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className='mt-2 text-sm font-medium text-green-600'>
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <Button disabled={processing}>Save</Button>
                </form>
            </CardContent>
        </Card>
    );
}

UpdateAccount.layout = (page: React.ReactNode) => (
    <AuthLayout title='Account Information'>
        <SettingLayout children={page} />
    </AuthLayout>
);
