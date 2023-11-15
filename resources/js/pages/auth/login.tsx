import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            {status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor='email'>Email</Label>

                    <Input
                        id='email'
                        type='email'
                        name='email'
                        value={data.email}
                        className='mt-1 block w-full'
                        autoComplete='username'
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className='mt-2' />
                </div>

                <div className='mt-4'>
                    <Label htmlFor='password'>Password</Label>

                    <Input
                        id='password'
                        type='password'
                        name='password'
                        value={data.password}
                        className='mt-1 block w-full'
                        autoComplete='current-password'
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className='mt-2' />
                </div>

                <div className='mt-4 flex items-center justify-between'>
                    <label className='flex items-center'>
                        <Checkbox
                            name='remember'
                            checked={data.remember}
                            onCheckedChange={(e: any) => setData('remember', e)}
                        />
                        <span className='ml-2 text-sm text-muted-foreground'>Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className='text-sm text-muted-foreground hover:text-foreground'>
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className='mt-10 flex items-center justify-between'>
                    <Link href={route('home')} className='text-sm text-muted-foreground hover:text-foreground'>
                        Back
                    </Link>
                    <div className='flex items-center'>
                        <Link href={route('register')} className='text-sm text-muted-foreground hover:text-foreground'>
                            Register
                        </Link>
                        <Button className='ms-4' disabled={processing}>
                            Log in
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

Login.layout = (page: React.ReactNode) => (
    <GuestLayout title='Login' description='Welcome back, enter your credentials to continue.' children={page} />
);
